import * as OAuth2Server from 'oauth2-server'
import TokenService from '../services/token'
import { IToken } from '../models/token'
import { IClient } from '../models/client'

import { checkType } from '../utils/util'

export const model: OAuth2Server.RequestAuthenticationModel = {
    getAccessToken: async (accessToken: string, callback?: OAuth2Server.Callback<OAuth2Server.Token>): Promise<OAuth2Server.Token | OAuth2Server.Falsey> => {
        console.log('getAccessToken:', accessToken)
        try {
            const result: IToken = (await TokenService.findOne({ accessToken })).toObject()
            if (!result) {
                throw new Error('token not found')
            } else {
                callback(null, result as OAuth2Server.Token)
            }
        } catch (e) {
            console.log('getAccessToken - Err:', e)
            callback(e)
        }
        return
    },

    verifyScope: async (token: OAuth2Server.Token, scope: string | string[], callback?: OAuth2Server.Callback<boolean>): Promise<boolean> => {
        console.log('verifyScope:', token, scope)
        return token.scope === scope
    },
}