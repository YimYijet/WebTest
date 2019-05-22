import * as OAuth2Server from 'oauth2-server'
import clientService from '../services/client'
import TokenService from '../services/token'
import { IClient } from '../models/client'
import { IToken } from '../models/token'

export const model: OAuth2Server.BaseModel = {

    getClient: async (clientId: string, clientSecret: string, callback?: OAuth2Server.Callback<OAuth2Server.Client | OAuth2Server.Falsey>): Promise<OAuth2Server.Client | OAuth2Server.Falsey> => {
        console.log('getClient:', clientId, clientSecret)
        try {
            const param = clientSecret ? {
                _id: clientId,
                clientSecret,
            } : {
                _id: clientId,
            }
            const result: IClient = (await clientService.findOne(param)).toObject()
            if (!result) {
                throw new Error('client not found')
            } else {
                callback(null, result as OAuth2Server.Client)
            }
        } catch (e) {
            console.log('getClient - Err:', e)
            callback(e)
        }
        return
    },

    saveToken: async (token: OAuth2Server.Token, client: OAuth2Server.Client, user: OAuth2Server.User, callback?: OAuth2Server.Callback<OAuth2Server.Token>): Promise<OAuth2Server.Token | OAuth2Server.Falsey> => {
        console.log('saveToken:', token.accessToken)
        try {
            const tokenItem: IToken = {
                accessToken: token.accessToken,
                accessTokenExpiresAt: token.accessTokenExpiresAt,
                scope: token.scope,
                client: client.id,
                user: user.id,
            } as IToken
            const result: IToken = (await TokenService.create(tokenItem)).toObject()
            if (!result) {
                throw new Error('cannot get token')
            } else {
                callback(null, {
                    ...result,
                    client,
                    user
                })
            }
        } catch (e) {
            console.log('saveToken - Err:', e)
            callback(e)
        } 
        return
    },
}