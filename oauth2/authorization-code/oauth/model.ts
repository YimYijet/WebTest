import { User, Client, Token, AuthorizationCode } from 'oauth2-server'

export interface IUser extends User {
    
}

export interface IClient extends Client {

}

export interface IToken extends Token {

}

export interface IAuthorizationCode extends AuthorizationCode {

}