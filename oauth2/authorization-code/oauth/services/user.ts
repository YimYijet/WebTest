import User, { IUser } from '../models/user'

class UserService {
    public static async find(): Promise<IUser[]> {
        return User.find({}).exec()
    }
    public static async findById(userId: any): Promise<IUser> {
        return User.findById(userId).exec()
    }
    public static async findOne(query: any): Promise<IUser> {
        return User.findOne(query).exec()
    }
    public static async create(item: IUser): Promise<IUser> {
        const user = new User(item)
        return user.save()
    }
    public static async remove(query: any): Promise<any> {
        return User.deleteOne(query)
    }
    public static async update(query: any, item: any): Promise<IUser> {
        return User.findOneAndUpdate(query, item, { new: true })
    }
}

export default UserService