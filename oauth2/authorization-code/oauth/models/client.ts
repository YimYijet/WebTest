import mongoose, { Schema } from '../db'
import { IUser } from './user' 
import { Types } from 'mongoose'

export interface IClient extends mongoose.Document {
    id: string | Types.ObjectId
    clientId: string
    clientSecret: string
    redirectUris: string
    accessTokenLifetime: number
    refreshTokenLifetime: number
    user: IUser | Types.ObjectId
}

export const ClientSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        auto: true,
        alias: 'id',
    },
    clientId: {
        required: true,
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
    user: {
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    }
}, {
    id: false,
    _id: false
})

export default mongoose.model<IClient>('Client', ClientSchema, 'oauth_client')