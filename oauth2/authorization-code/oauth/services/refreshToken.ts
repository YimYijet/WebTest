import RefreshToken, { IRefreshToken } from '../models/refreshToken'

class RefreshTokenService {

    public static async findOne(query: any): Promise<IRefreshToken> {
        return RefreshToken.findOne(query)
        .populate('user')
        .populate('client')
        .exec()
    }
    public static async create(item: IRefreshToken): Promise<IRefreshToken> {
        const token = new RefreshToken(item)
        return token.save()
    }
}

export default RefreshTokenService