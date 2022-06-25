import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { MongoClient } from "mongodb"
import { Fragment } from 'react'



export async function getStaticProps(context){
  const url = "mongodb+srv://root:megamanX12345@cluster0.1tk2l.mongodb.net/todo_app?retryWrites=true&w=majority"
  const client = await MongoClient.connect(url)
  const todoCollection = client.db('todo_app').collection("todos")
  const todoArray = await todoCollection.find().toArray()
  client.close()
  return {
    props:{
      todos : todoArray.map(todo => ({
        heading: todo.heading,
        description: todo.description,
        id: todo._id.toString()
      }))
    },
    revalidate: 1
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
          <div key={todo.id}>
              <h1>{todo.heading}</h1>
              <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

