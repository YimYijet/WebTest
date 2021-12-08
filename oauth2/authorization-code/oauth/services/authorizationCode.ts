import AuthorizationCode, { IAuthorizationCode } from '../models/authorizationCode'

class AuthorizationCodeService {

    public static async findOne(query: any): Promise<IAuthorizationCode> {
        return AuthorizationCode.findOne(query)
        .populate('user')
        .populate('client')
        .exec()
    }
    public static async create(item: IAuthorizationCode): Promise<IAuthorizationCode> {
        const code = new AuthorizationCode(item)
        return code.save()
    }
    public static async remove(query: any): Promise<any> {
        return AuthorizationCode.deleteOne(query)
    }
}

export default AuthorizationCodeService