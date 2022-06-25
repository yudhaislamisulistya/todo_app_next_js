import { connect } from "../../../lib/mongodb";

export default async function handler(req, resp){
    if(req.method !== 'GET'){
        resp.status(403).send('Method Not Allowed')
        return
    }
    // Halo
    try {
        const { db } = await connect()
        const todos = await db
            .collection("todos")
            .find({})
            .sort({'_id': -1})
            .toArray();

        resp.status(200).json({
            data: todos,
            status: 'success',
            code: 200
        })
    } catch (error) {
        resp.status(500).send({
            error: error
        })
    }
}