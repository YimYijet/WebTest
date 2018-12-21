import * as Waterline from 'waterline'

export interface IUser { 
    name: string
}

export const model: Waterline.CollectionClass = Waterline.Collection.extend({
    identity: 'user',
    tableName: 'user',
    datastore: 'oauth',
    schema: true,
    primaryKey: 'id',
    attributes: {
        id: {
            type: 'string',
            columnName: '_id',
        },
        name: {
            type: 'string',
        }
    }
} as Waterline.Collection)