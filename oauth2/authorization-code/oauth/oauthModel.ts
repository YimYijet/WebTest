import * as OAuth2Server from 'oauth2-server'
import { model as passwordModel } from './oauthModels/passwordModel'
import { model as authenticationModel } from './oauthModels/authenticationModel'
import { model as clientModel } from './oauthModels/clientCredentialsModel'
import { model as refreshTokenModel } from './oauthModels/refreshTokenModel'

const server = new OAuth2Server({
    accessTokenLifetime: 12 * 60 * 60,
    allowBearerTokensInQueryString: true,
    model: {
        ...passwordModel,
        ...authenticationModel,
        ...clientModel,
        ...refreshTokenModel
    },
})

export default server