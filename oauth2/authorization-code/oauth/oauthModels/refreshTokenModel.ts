import * as OAuth2Server from 'oauth2-server'

import { model as baseModel } from './baseModel'
import { model as requestAuthenticationModel } from './requestAuthenticationModel'

export const model: OAuth2Server.RefreshTokenModel = Object.assign({
    getRefreshToken: async (refreshToken: string, callback?: OAuth2Server.Callback<OAuth2Server.RefreshToken>): Promise<OAuth2Server.RefreshToken | OAuth2Server.Falsey> => {
        console.log('getRefreshToken', refreshToken)
        return
    },

    revokeToken: async (token: OAuth2Server.RefreshToken | OAuth2Server.Token, callback?: OAuth2Server.Callback<boolean>): Promise<boolean> => {
        console.log('revokeToken', token.accessToken)
        return 
    }
}, baseModel, requestAuthenticationModel)