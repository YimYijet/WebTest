import * as OAuth2Server from 'oauth2-server'
import * as crypto from 'crypto'
import clientService from './services/client'
import TokenService from './services/token'
import RefreshTokenService from './services/refreshToken'
import AuthorizationCodeService from './services/authorizationCode'
import { IToken } from './models/token'
import { IRefreshToken } from './models/refreshToken'
import { IClient } from './models/client'
import { IAuthorizationCode } from './models/authorizationCode'

import { checkType } from './lib/checkType'

const OAuth2ServerModel: OAuth2Server.AuthorizationCodeModel = {
    /** 
     * BaseModel 可选
     * Invoked to generate a new access token. 
     */    
    // generateAccessToken: async (client: OAuth2Server.Client, user: OAuth2Server.User, scope: string | string[], callback?: OAuth2Server.Callback<string>): Promise<string> => {
    //     return 
    // },

    /** 
     * BaseModel 必选
     * Invoked to retrieve a client using a client id or a client id/client secret combination, depending on the grant type.
     */    
    getClient: async (clientId: string, clientSecret: string, callback?: OAuth2Server.Callback<OAuth2Server.Client | OAuth2Server.Falsey>): Promise<OAuth2Server.Client | OAuth2Server.Falsey> => {
        console.log('clientId:', clientId)
        let client: OAuth2Server.Client
        try {
            const result: IClient = await clientService.findOne( clientSecret ? { _id: clientId, clientSecret } : { _id: clientId })
            if (!result) {
                throw new Error('client not found')
            } else {
                client = {
                    ...result,
                    grants: 'authorization_code',
                } as OAuth2Server.Client
            }
        } catch (e) {
            console.log('getClient - Err:', e)
        }
        return client
    },

    /** 
     * BaseModel 必选
     * Invoked to save an access token and optionally a refresh token, depending on the grant type.
     */
    saveToken: async (token: OAuth2Server.Token, client: OAuth2Server.Client, user: OAuth2Server.User, callback?: OAuth2Server.Callback<OAuth2Server.Token>): Promise<OAuth2Server.Token | OAuth2Server.Falsey> => {
        console.log('saveToken:', token, client, user)
        const tokenItem: IToken = {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            scope: token.scope,
            client: client.id,
            user: user.id,
        } as IToken,
        refreshTokenItem: IRefreshToken = {
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            scope: token.scope,
            client: client.id,
            user: user.id,
        } as IRefreshToken,
        promiseGroup: Promise<any>[] = [TokenService.create(tokenItem)]
        if (token.refreshToken) promiseGroup.push(RefreshTokenService.create(refreshTokenItem))
        try {
            const [at, rt] = await Promise.all(promiseGroup)
            if (!at) throw new Error('do not create accessToken')
            if (!rt) throw new Error('do not create refreshToken')
        } catch (e) {
            console.log('saveToken - Err:', e)
        } 
        return {
            ...token,
            client,
            user,
        } as OAuth2Server.Token
    },

    /** 
     * RequestAuthenticationModel 必选
     * Invoked to retrieve an existing access token previously saved through Model#saveToken().
     */    
    getAccessToken: async (accessToken: string, callback?: OAuth2Server.Callback<OAuth2Server.Token>): Promise<OAuth2Server.Token | OAuth2Server.Falsey> => {
        let token: OAuth2Server.Token
        try {
            const result: IToken = await TokenService.findOne({ accessToken })
            if (!result) {
                throw new Error('token not found')
            } else if (checkType<IClient>(result.client)) {
                token = {
                    ...result,
                    client: {
                        ...result.client,
                        grants: 'authorization_code'
                    }
                } as OAuth2Server.Token
            }
        } catch (e) {
            console.log('getAccessToken - Err:', e)
        }
        return token
    },

    /** 
     * RequestAuthenticationModel 必选
     * Invoked during request authentication to check if the provided access token was authorized the requested scopes.
     */   
    verifyScope: async (token: OAuth2Server.Token, scope: string | string[], callback?: OAuth2Server.Callback<boolean>): Promise<boolean> => {
        return token.scope === scope
    },

    /**
     * AuthorizationCodeModel 可选
     * Invoked to generate a new refresh token.
     */
    // generateRefreshToken: async (client: OAuth2Server.Client, user: OAuth2Server.User, scope: string | string[], callback?: OAuth2Server.Callback<string>): Promise<string> => {
    //     return
    // },

    /**
     * AuthorizationCodeModel 必选
     * Invoked to retrieve an existing authorization code previously saved through Model#saveAuthorizationCode().
     */
    getAuthorizationCode: async (authorizationCode: string, callback?: OAuth2Server.Callback<OAuth2Server.AuthorizationCode>): Promise<OAuth2Server.AuthorizationCode | OAuth2Server.Falsey> => {
        let code: OAuth2Server.AuthorizationCode
        try {
            const result: IAuthorizationCode = await AuthorizationCodeService.findOne({ authorizationCode })
            if (!result) {
                throw new Error('authorization code not found')
            } else if (checkType<IClient>(result.client)) {
                code = {
                    ...result,
                    client: {
                        ...result.client,
                        grants: 'authorization_code',
                    }
                } as OAuth2Server.AuthorizationCode
            }
        } catch (e) {
            console.log('getAuthorizationCode - Err:', e)
        }
        return code
    },

    /**
     * AuthorizationCodeModel 必选
     * Invoked to save an authorization code.
     */
    saveAuthorizationCode: async (code: OAuth2Server.AuthorizationCode, client: OAuth2Server.Client, user: OAuth2Server.User, callback?: OAuth2Server.Callback<OAuth2Server.AuthorizationCode>): Promise<OAuth2Server.AuthorizationCode | OAuth2Server.Falsey> => {
        console.log('saveAuthorizationCode:', code, client, user)
        const codeItem: IAuthorizationCode = {
            ...code,
            client: client.id,
            user: user.id
        } as IAuthorizationCode
        try {
            const result = await AuthorizationCodeService.create(codeItem)
            if (!result) throw new Error('do not create authorization code')
        } catch (e) {
            console.log('saveAuthorizationCode - Err:', e)
        }
        return {
            ...code,
            client,
            user
        }
    },

    /**
     * AuthorizationCodeModel 必选
     * Invoked to revoke an authorization code.
     */
    revokeAuthorizationCode: async (authorizationCode: OAuth2Server.AuthorizationCode, callback?: OAuth2Server.Callback<boolean>): Promise<boolean> => {
        try {
            const result: any = await AuthorizationCodeService.remove({ authorizationCode })
            if (result.ok) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log('revokeAuthorizationCode - Err:', e)
            return false
        }
    },

    /**
     * AuthorizationCodeModel 可选
     * Invoked to check if the requested scope is valid for a particular client/user combination.
     */
    validateScope: async (user: OAuth2Server.User, client: OAuth2Server.Client, scope: string | string[], callback?: OAuth2Server.Callback<string | OAuth2Server.Falsey>): Promise<string | string[] | OAuth2Server.Falsey> => {
        console.log('validateScope:', user, client, scope)
        return (user.scope === client.scope) ? scope : false
    },
}

export default new OAuth2Server({
    accessTokenLifetime: 12 * 60 * 60,
    allowBearerTokensInQueryString: true,
    model: OAuth2ServerModel,
})