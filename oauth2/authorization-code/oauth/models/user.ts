import mongoose, { Schema } from '../db'

export interface IUser extends mongoose.Document { 
    name: string
    password: string
}

export const UserSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
})

export default mongoose.model<IUser>('User', UserSchema, 'user')