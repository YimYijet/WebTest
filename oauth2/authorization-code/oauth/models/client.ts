import mongoose, { Schema } from '../db'

export interface IClient extends mongoose.Document {
    clientName: string
    clientSecret?: string
    redirectUris: string
    accessTokenLifetime: number
    refreshTokenLifetime: number
}

export const ClientSchema = new Schema({
    clientName: {
        required: true,
        type: String,
    },
    clientSecret: {
        type: String,
    },
    redirectUris: {
        required: true,
        type: String,
    },
    accessTokenLifetime: {
        required: true,
        type: Number,
    },
    refreshTokenLifetime: {
        required: true,
        type: Number,
    },
})

export default mongoose.model<IClient>('Client', ClientSchema, 'oauth_client')