import Client, { IClient } from '../models/client'

class ClientService {

    public static async find(): Promise<IClient[]> {
        return Client.find({}).exec()
    }
    public static async findById(clientId: any): Promise<IClient> {
        return Client.findById(clientId).exec()
    }
    public static async findOne(query: any): Promise<IClient> {
        return Client.findOne(query).exec()
    }
    public static async create(item: IClient): Promise<IClient> {
        const client = new Client(item)
        return client.save()
    }
    public static async remove(query: any): Promise<any> {
        return Client.remove(query).exec()
    }
    public static async update(query: any, item: any): Promise<IClient> {
        return Client.findOneAndUpdate(query, item, { new: true })
    }
}

export default ClientService