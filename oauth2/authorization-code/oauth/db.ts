import { Config } from 'waterline'

const mongoAdapter = require('sails-mongo')

export const config: Config = {
    adapters: {
        'mongo': mongoAdapter,
    },
    datastores: {
        oauth: {
            adapter: 'mongo',
            url: 'mongodb://localhost:27017/oauth2'
        }
    }
}