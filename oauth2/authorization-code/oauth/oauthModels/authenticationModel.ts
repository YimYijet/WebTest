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
        try {
            const result: IAuthorizationCode = (await AuthorizationCodeService.findOne({ authorizationCode })).toObject()
            if (!result) {
                throw new Error('authorization code not found')
            } else {
                callback(null, result as OAuth2Server.AuthorizationCode)
            }
        } catch (e) {
            console.log('getAuthorizationCode - Err:', e)
            callback(e)
        }
        return
    },

    saveAuthorizationCode: async (code: OAuth2Server.AuthorizationCode, client: OAuth2Server.Client, user: OAuth2Server.User, callback?: OAuth2Server.Callback<OAuth2Server.AuthorizationCode>): Promise<OAuth2Server.AuthorizationCode | OAuth2Server.Falsey> => {
        console.log('saveAuthorizationCode:', code.authorizationCode)
        try {
            const codeItem: IAuthorizationCode = {
                ...code,
                client: client.id,
                user: user.id
            } as IAuthorizationCode
            const result = (await AuthorizationCodeService.create(codeItem)).toObject()
            if (!result) {
                throw new Error('do not create authorization code')
            } else {
                callback(null, {
                    ...result,
                    client,
                    user
                })
            }
        } catch (e) {
            console.log('saveAuthorizationCode - Err:', e)
            callback(e)
        }
        return
    },

    revokeAuthorizationCode: async (authorizationCode: OAuth2Server.AuthorizationCode, callback?: OAuth2Server.Callback<boolean>): Promise<boolean> => {
        console.log('revokeAuthorizationCode:', authorizationCode.authorizationCode)
        try {
            const result: any = await AuthorizationCodeService.remove({ _id: authorizationCode.id })
            if (result.ok) {
                callback(null, true)
            } else {
                throw new Error('do not delete authorization code')
            }
        } catch (e) {
            console.log('revokeAuthorizationCode - Err:', e)
            callback(e)
        }
        return
    },

    validateScope: async (user: OAuth2Server.User, client: OAuth2Server.Client, scope: string | string[], callback?: OAuth2Server.Callback<string | OAuth2Server.Falsey>): Promise<string | string[] | OAuth2Server.Falsey> => {
        console.log('validateScope:', scope)
        callback(null, scope as string)
        return
    },

}, baseModel, requestAuthenticationModel)