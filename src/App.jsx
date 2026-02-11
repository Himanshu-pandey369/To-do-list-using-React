import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [Done, setDone] = useState(false)
  const handleAdd = () => {
    if (todo.trim() === "") return
    settodos([...todos, { id: Date.now(), todo, isCompleted: false }])
    settodo("")
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
    setisLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos, isLoading])

  const toggleCompleted = (id) => {
    settodos(todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ))
  }
  const isDone = () => {
    setDone(!Done)
  }

  const handleEdit = (id) => {
    const itemToEdit = todos.find(item => item.id === id)
    if (itemToEdit) {
      settodo(itemToEdit.todo)
      handleDelete(id)
    }
  }

  const handleDelete = (id) => {
    settodos(todos.filter(item => item.id !== id))
    confirm("Are you sure to delete this task")
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-100 my-3 rounded-xl p-5 md:w-1/2">
        <h1 className='text-2xl font-bold text-black text-center'>iTask - manage your todos at one place </h1>
        <h2 className='text-xl font-bold text-black'>Add a Todo</h2>
        <div className="input flex gap-3 my-4 w-full">
          <input onChange={handlechange} value={todo} className='bg-white rounded-xl p-1 px-3 w-full' type="text" placeholder='Add task' />
          <button onClick={handleAdd} className='text-white bg-purple-600 p-1 px-3 font-bold rounded-full'>Save</button>
        </div>
        <input type="checkbox" checked={Done} onChange={isDone} /> <span>Show Finished</span>
        <div className="todos py-5 my-3">
          <h2 className='font-bold '>Your Todos</h2>
          {todos.length == 0 && <div className='font-bold text-center py-7'>No Todos to display</div>}
          {todos.map(item => {
            return (Done || !item.isCompleted) && <div key={item.id} className="todo m-3 flex w-full gap-4 px-3 justify-between">
              <div className={item.isCompleted ? "line-through" : ""}>
                <input type="checkbox" checked={item.isCompleted} onChange={() => toggleCompleted(item.id)} /> {item.todo}
              </div>
              <div className="buttons flex gap-2">
                <button onClick={() => handleEdit(item.id)} className='text-white bg-purple-600 p-1 px-3 font-bold rounded-full max-h-8'>Edit</button>
                <button onClick={() => handleDelete(item.id)} className='text-white bg-purple-600 p-1 px-3 font-bold rounded-full max-h-8'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App