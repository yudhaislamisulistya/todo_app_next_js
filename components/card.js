import { useRouter } from "next/router"
import { useState } from "react"

const Card = ({todo, url}) => {
    const { heading, description } = todo
    const [deleting, setDeleting] = useState()
    const router = useRouter()

    // Delete Todo
    const deleteTodo = async () => {
        console.log(todo._id);
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
            <span className="badge badge-info mr-2">Edit</span>
            {/* <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteTodo(todo._id)}>
            {deleting ? 'Deleting...' : 'Delete'}
            </button> */}
            </div>
        </div>
    )
}
    
export default Card;