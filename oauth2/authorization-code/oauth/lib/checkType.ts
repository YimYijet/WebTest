export function checkType<T>(obj: T | any) : obj is T {
    return (obj && obj.name && typeof obj.name === 'string');
}