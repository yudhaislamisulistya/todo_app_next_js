import { ObjectId } from "mongodb";
import { connect } from "../../../lib/mongodb";

export default async function handler(req, res){
    const { id } = req.query;
    const { db } = await connect();
    const todo = await db.collection('todos').findOne({_id: ObjectId(id)});
    res.status(200).json({
        data: todo,
        status: 'success',
        code: 200
    })
}