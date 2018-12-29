import { Query } from 'mongoose'
import Token, { IToken } from '../models/token'

class TokenService {

    public static async findOne(query: any): Promise<IToken> {
        return Token.findOne(query)
        .populate('User')
        .populate('Client')
        .exec()
    }
    public static async create(item: IToken): Promise<IToken> {
        const token = new Token(item)
        return token.save()
    }
}

export default TokenService