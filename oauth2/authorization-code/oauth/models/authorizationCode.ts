import mongoose, { Schema } from '../db'
import { IClient } from './client'
import { IUser } from './user'
import { Types } from 'mongoose'

export interface IAuthorizationCode extends mongoose.Document { 
    authorizationCode: string
    redirectUri: string
    client: IClient | Types.ObjectId | string
    user: IUser | Types.ObjectId | string
    expiresAt: Date
    scope: string
}

export const AuthorizationCodeSchema = new Schema({
    authorizationCode: {
        required: true,
        type: String,
    },
    redirectUri: {
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
    expiresAt: {
        required: true,
        type: Date
    },
    scope: {
        required: true,
        type: String
    },
})

export default mongoose.model<IAuthorizationCode>('AuthorizationCode', AuthorizationCodeSchema, 'oauth_authorization_code')