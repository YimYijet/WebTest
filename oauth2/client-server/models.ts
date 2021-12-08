import mongoose, { Schema } from './db'
import { Types } from 'mongoose'

export interface IUser extends mongoose.Document {
    id: Types.ObjectId | string
    name: string
    password: string
}

export const UserSchema = new Schema({
    _id: {
        type: Types.ObjectId,
        auto: true,
        alias: 'id'
    },
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
}, {
    id: false,
    _id: false
})

export default mongoose.model<IUser>('User', UserSchema, 'user')