import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import Card from '../components/card'




export async function getServerProps(context){

  const dev = process.env.NODE_ENV !== 'production'
  const { DEV_URL, PROD_URL } = process.env


  const res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/todo/get`)
  const data = await res.json()

  return {
      props: {
          todos: data.data,
          url: dev ? DEV_URL : PROD_URL,
      }
  }
}


export default function Home({todos, url}) {


  const [heading, setHeading] = React.useState();
  const [description, setDescription] = React.useState();
  const [error, setError] = React.useState();
  const [status, setStatus] = React.useState();
  const router = useRouter();

  const handlePost = async (e) => {

    e.preventDefault()

    setError('')
    setStatus('')

    if(!heading || !description){
      return setError('Require Heading and Description')
    }

    const post = {
      heading,
      description,
      createdAt: new Date().toISOString()
    }


    const res = await fetch(`${url}/api/todo/create`, {
      method: "POST",
      body: JSON.stringify(post),
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const data = await res.json()

    if(data.status === 'success'){
      setHeading('')
      setDescription('')
      setStatus(data.status)
      router.push('/')
    }else{
      setError(data.status)
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Todo App - Yudha Islami Sulistya</title>
      </Head>
      <div className='jumbotron text-center'>
        <h1 className='display-4'>Todo App</h1>
        <p className='lead'>Built in Next.js</p>
        <form onSubmit={handlePost}>
          {error ? (
              <div className='form-group'>
                  <h3>{error}</h3>
              </div>
          ) : null}
          {status ? (
              <div className='form-group'>
                  <h3>{status}</h3>
              </div>
          ) : null}
          <div className="form-group">
            <input type="text" name='heading' value={heading} className="form-control" placeholder="Heading" aria-describedby="helpId" onChange={(e) => setHeading(e.target.value)}/>
          </div>
          <div className="form-group">
            <input type="text" name='description' value={description} className="form-control" placeholder="Description" aria-describedby="helpId" onChange={(e) => setDescription(e.target.value)}/>
          </div>
          <div className="form-group">
            <button type='submit' className="btn btn-primary">Add Todo</button>
          </div>
        </form>
      </div>
      <div className='container'>
        {todos.map(todo => (
          <Card key={todo._id} todo={todo} url={url}/>
        ))}
      </div>
    </Fragment>
  )
}

