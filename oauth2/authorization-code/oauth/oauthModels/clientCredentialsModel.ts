import * as OAuth2Server from 'oauth2-server'

import { model as baseModel } from './baseModel'
import { model as requestAuthenticationModel } from './requestAuthenticationModel'

export const model: OAuth2Server.ClientCredentialsModel = Object.assign({
    getUserFromClient: async (client: OAuth2Server.Client, callback?: OAuth2Server.Callback<OAuth2Server.User | OAuth2Server.Falsey>): Promise<OAuth2Server.User | OAuth2Server.Falsey> => {
        console.log('getUserFromClient', client)
        return
    }
}, baseModel, requestAuthenticationModel)