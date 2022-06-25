import { MongoClient, ServerApiVersion} from "mongodb";

export default async function(req, resp){
    if(req.method !== 'POST') {
        resp.status(405).send('Method not allowed');
        return;
    }

    const { heading, description } = req.body

    if(!heading || !description) return

    const uri = "mongodb+srv://root:megamanX12345@cluster0.1tk2l.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    const db = client.db('todo_app')
    const collection = db.collection('todos')
    const result = await collection.insertOne({heading, description})
    client.close()

    resp.status(200).json({ result })
}