import * as OAuth2Server from 'oauth2-server'
import AuthorizationCodeService from '../services/authorizationCode'
import { IAuthorizationCode } from '../models/authorizationCode'
import { IClient } from '../models/client'
import { checkType } from '../utils/util'

import { model as baseModel } from './baseModel'
import { model as requestAuthenticationModel } from './requestAuthenticationModel'

export const model: OAuth2Server.AuthorizationCodeModel = Object.assign({
    
    getAuthorizationCode: async (authorizationCode: string, callback?: OAuth2Server.Callback<OAuth2Server.AuthorizationCode>): Promise<OAuth2Server.AuthorizationCode | OAuth2Server.Falsey> => {
        console.log('getAuthorizationCode:', authorizationCode)
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

    revokeAuthorizationCode: async (authorizationCode: OAuth2Server.AuthorizationCode, callback?: OAuth2Server.Callback<boolean>): Promise<boolean> => {
        console.log('revokeAuthorizationCode:', authorizationCode)
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

    validateScope: async (user: OAuth2Server.User, client: OAuth2Server.Client, scope: string | string[], callback?: OAuth2Server.Callback<string | OAuth2Server.Falsey>): Promise<string | string[] | OAuth2Server.Falsey> => {
        console.log('validateScope:', user, client, scope)
        callback(null, scope as string)
        return (user.scope === client.scope) ? scope : false
    },

}, baseModel, requestAuthenticationModel)