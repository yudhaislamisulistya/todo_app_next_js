import Head from 'next/head'
import { Fragment } from 'react'


export async function getStaticProps(context){
  const dev = process.env.NODE_ENV !== 'production'
  let { DEV_URL, PROD_URL } = process.env

  const res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/todo/get`)
  const data = await res.json()

  return {
      props: {
          todos: data.todos,
      }
  }
}


export default function Home({todos}) {
  return (
    <Fragment>
      <Head>
        <title>Todo App - Yudha Islami Sulistya</title>
      </Head>
      <div>
        <h1>Todo App New</h1>
        {todos.map(todo => (
          <div key={todo._id}>
              <h1>{todo.heading}</h1>
              <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

