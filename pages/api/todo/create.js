import { connect } from "../../../lib/mongodb";

export default async function handler(req, resp){
    if(req.method !== 'POST'){
        resp.status(403).send('Method Not Allowed')
        return
    }

    const { heading, description } = req.body

    if(!heading || !description){
        resp.status(403).send('Require Heading and Description')
        return
    }

    try {
        const { db } = await connect;
        const result = await db.collection('todos').insertOne({heading, description})
        resp.status(200).json({ heading, description, result })
    } catch (error) {
        resp.status(500).send(error)
    }
}