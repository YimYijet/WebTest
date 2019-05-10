import * as crypto from 'crypto'

export function checkType<T>(obj: T | any) : obj is T {
    return (obj && obj.name && typeof obj.name === 'string');
}

export function encrypt(password: string): string {
    return crypto.scryptSync(password, 'salt', 64).toString('base64')
}