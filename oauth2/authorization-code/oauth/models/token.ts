import mongoose, { Schema } from '../db'
import { IClient } from './client'
import { IUser } from './user'
import { Types } from 'mongoose'

export interface IToken extends mongoose.Document { 
    accessToken: string
    client: IClient | Types.ObjectId | string
    user: IUser | Types.ObjectId | string
    accessTokenExpiresAt: Date
    scope: string
}

export const TokenSchema = new Schema({
    accessToken: {
        required: true,
        type: String,
    },
    client: {
        required: true,
        type: Types.ObjectId,
        ref: 'Client',
    },
    user: {
        required: true,
        type: Types.ObjectId,
        ref: 'User',
    },
    accessTokenExpiresAt: {
        required: true,
        type: Date
    },
    scope: {
        required: true,
        type: String
    },
})

export default mongoose.model<IToken>('Token', TokenSchema, 'oauth_access_token')