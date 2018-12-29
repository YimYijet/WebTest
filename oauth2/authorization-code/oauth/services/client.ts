import Client, { IClient } from '../models/client'

class ClientService {

    public static async findOne(query: any): Promise<IClient> {
        return Client.findOne(query)
        .populate('User')
        .exec()
    }
    public static async create(item: IClient): Promise<IClient> {
        const client = new Client(item)
        return client.save()
    }
}

export default ClientService