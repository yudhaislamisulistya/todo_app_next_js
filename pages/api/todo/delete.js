import { ObjectId } from "mongodb"
import { connect } from "../../../lib/mongodb"

export default async function handler(req, res) {
    if(req.method !== 'DELETE'){
        res.status(405).send('Method Not Allowed')
        return
    }

    const { _id } = req.body
    const { db } = await connect()
    const todo = await db.collection('todos').findOne({ _id: ObjectId(_id) })
    if (!todo) {
        res.status(404).json({ status: 'error', message: 'Todo not found', _id: _id, todo: todo })
    } else {
        const statusDeleted = await db.collection('todos').deleteOne({ _id: ObjectId(_id) })
        res.status(200).json({ status: 'success', message: 'Todo deleted', _id: _id, statusDeleted: statusDeleted})
    }
}
