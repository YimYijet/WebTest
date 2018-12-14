import * as OAuth2Server from 'oauth2-server'
import { rejects } from 'assert';

const OAuth2ServerModel: OAuth2Server.AuthorizationCodeModel = {
    /** 
     * BaseModel 可选
     * Invoked to generate a new access token. 
     */    
    generateAccessToken: (client: OAuth2Server.Client, user: OAuth2Server.User, scope: string | string[], callback?: OAuth2Server.Callback<string>): Promise<string> => {
        return new Promise((resolve, reject) => {

        })
    },

    /** 
     * BaseModel 必选
     * Invoked to retrieve a client using a client id or a client id/client secret combination, depending on the grant type.
     */    
    getClient: (clientId: string, clientSecret: string, callback?: OAuth2Server.Callback<OAuth2Server.Client | OAuth2Server.Falsey>): Promise<OAuth2Server.Client | OAuth2Server.Falsey> => {
        return 
    },

    /** 
     * BaseModel 必选
     * Invoked to save an access token and optionally a refresh token, depending on the grant type.
     */
    saveToken: (token: OAuth2Server.Token, client: OAuth2Server.Client, user: OAuth2Server.User, callback?: OAuth2Server.Callback<OAuth2Server.Token>): Promise<OAuth2Server.Token | OAuth2Server.Falsey> => {
        return
    },

    /** 
     * RequestAuthenticationModel 必选
     * Invoked to retrieve an existing access token previously saved through Model#saveToken().
     */    
    getAccessToken: (accessToken: string, callback?: OAuth2Server.Callback<OAuth2Server.Token>): Promise<OAuth2Server.Token | OAuth2Server.Falsey> => {
        return
    },

    /** 
     * RequestAuthenticationModel 必选
     * Invoked during request authentication to check if the provided access token was authorized the requested scopes.
     */   
    verifyScope: (token: OAuth2Server.Token, scope: string | string[], callback?: OAuth2Server.Callback<boolean>): Promise<boolean> => {
        return
    },

    /**
     * AuthorizationCodeModel 可选
     * Invoked to generate a new refresh token.
     */
    generateRefreshToken: (client: OAuth2Server.Client, user: OAuth2Server.User, scope: string | string[], callback?: OAuth2Server.Callback<string>): Promise<string> => {
        return
    },

    /**
     * AuthorizationCodeModel 可选
     * Invoked to generate a new authorization code.
     */
    generateAuthorizationCode: (client: OAuth2Server.Client, user: OAuth2Server.User, scope: string | string[], callback?: OAuth2Server.Callback<string>): Promise<string> => {
        return
    },

    /**
     * AuthorizationCodeModel 必选
     * Invoked to retrieve an existing authorization code previously saved through Model#saveAuthorizationCode().
     */
    getAuthorizationCode: (authorizationCode: string, callback?: OAuth2Server.Callback<OAuth2Server.AuthorizationCode>): Promise<OAuth2Server.AuthorizationCode | OAuth2Server.Falsey> => {
        return
    },

    /**
     * AuthorizationCodeModel 必选
     * Invoked to save an authorization code.
     */
    saveAuthorizationCode: (code: OAuth2Server.AuthorizationCode, client: OAuth2Server.Client, user: OAuth2Server.User, callback?: OAuth2Server.Callback<OAuth2Server.AuthorizationCode>): Promise<OAuth2Server.AuthorizationCode | OAuth2Server.Falsey> => {
        return
    },

    /**
     * AuthorizationCodeModel 必选
     * Invoked to revoke an authorization code.
     */
    revokeAuthorizationCode: (code: OAuth2Server.AuthorizationCode, callback?: OAuth2Server.Callback<boolean>): Promise<boolean> => {
        return
    },

    /**
     * AuthorizationCodeModel 可选
     * Invoked to check if the requested scope is valid for a particular client/user combination.
     */
    validateScope: (user: OAuth2Server.User, client: OAuth2Server.Client, scope: string | string[], callback?: OAuth2Server.Callback<string | OAuth2Server.Falsey>): Promise<string | string[] | OAuth2Server.Falsey> => {
        return
    },
}