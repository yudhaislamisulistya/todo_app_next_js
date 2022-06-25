import { ObjectId } from "mongodb"
import { connect } from "../../../lib/mongodb"

export default async function handler(req, res){
    if(req.method !== 'PUT'){
        res.status(405).send('Method Not Allowed')
        return
    }

    const { _id, heading, description } = req.body
    const { db } = await connect()
    const todo = await db.collection('todos').findOne({ _id: ObjectId(_id) })
    if (!todo) {
        res.status(404).json({ status: 'error', message: 'Todo not found', _id: _id, todo: todo })
    } else {
        const statusUpdated = await db.collection('todos').updateOne({ _id: ObjectId(_id) }, { $set: { heading, description } })
        res.status(200).json({ status: 'success', message: 'Todo updated', _id: _id, statusUpdated: statusUpdated })
    }
}