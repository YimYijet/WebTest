import * as OAuth2Server from 'oauth2-server'
import UserService from '../services/user'
import { IUser } from '../models/user'
import { encrypt } from '../utils/util'

import { model as baseModel } from './baseModel'
import { model as requestAuthenticationModel } from './requestAuthenticationModel'

export const model: OAuth2Server.PasswordModel = Object.assign({
    getUser: async (name: string, password: string, callback?: OAuth2Server.Callback<OAuth2Server.User | OAuth2Server.Falsey>): Promise<OAuth2Server.User | OAuth2Server.Falsey> => {
        console.log('getUser:', name, password)
        try {
            const user: IUser = (await UserService.findOne({ name, password: encrypt(password) })).toObject()
            if (!user) {
                throw new Error('user not found')
            } else {
                callback(null, user)
            }
        } catch (e) {
            console.log('getUser - Err:', e)
            callback(e)
        }
        return
    }
}, baseModel, requestAuthenticationModel)