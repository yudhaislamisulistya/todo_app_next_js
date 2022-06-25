import { connect } from "../../../lib/mongodb";

export default async function handler(req, resp){
    if(req.method !== 'GET'){
        resp.status(403).send('Method Not Allowed')
        return
    }

    try {
        const { db } = await connect()
        const todos = await db
            .collection("todos")
            .find({})
            .toArray();

        resp.status(200).json({
            todos: todos,
            status: 'success',
            code: 200
        })
    } catch (error) {
        resp.status(500).send({
            error: error
        })
    }
}