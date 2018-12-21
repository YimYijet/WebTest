import waterline from '../models'
import { IUser } from '../models/User'

export const find = async (): Promise<Array<IUser>> => {
    return waterline.models.user.find()
}

export const create = async (item: IUser): Promise<IUser> => {
    return waterline.models.user.create(item).fetch()
}