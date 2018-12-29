import mongoose, { Schema } from '../db'
import { IClient } from './client'
import { IUser } from './user'
import { Types } from 'mongoose'

export interface IRefreshToken extends mongoose.Document { 
    refreshToken: string
    client: IClient | Types.ObjectId | string
    user: IUser | Types.ObjectId | string
    refreshTokenExpiresAt: Date
    scope: string
}

export const RefreshTokenSchema = new Schema({
    refreshToken: {
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
    refreshTokenExpiresAt: {
        required: true,
        type: Date
    },
    scope: {
        required: true,
        type: String
    },
})

export default mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema, 'oauth_refresh_token')