import { useRouter } from "next/router"
import { useState } from "react"

const Card = ({todo, url, setHeading, setDescription, setUpdate, set_Id}) => {
    const { heading, description } = todo
    const [deleting, setDeleting] = useState()
    const router = useRouter()

    // Get Todo By Id
    const getTodoById = async () => {
        const id = todo._id
        const res = await fetch(`${url}/api/todo/${id}`)
        const data = await res.json()
        setHeading(data.data.heading)
        setDescription(data.data.description)
        setUpdate(data.status)
        set_Id(todo._id)
        return data.data
    }
    // Delete Todo
    const deleteTodo = async () => {
        setDeleting(true)
        const res = await fetch(`${url}/api/todo/delete`, {
            method: "DELETE",
            body: JSON.stringify({ _id: todo._id }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const data = await res.json()
        setDeleting(false)
        if (data.status === 'success') {
            router.push('/')
        }
    }
    return(
        <div className="card text-left mt-2">
            <div className="card-body">
            <h4 className="card-title">{heading}</h4>
            <p className="card-text">{description}</p>
            <button className="btn btn-info btn-sm mr-2"
                onClick={() => getTodoById(todo._id)}>
                Edit
            </button>
            <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTodo(todo._id)}>
            {deleting ? 'Deleting...' : 'Delete'}
            </button>
            </div>
        </div>
    )
}
    
export default Card;