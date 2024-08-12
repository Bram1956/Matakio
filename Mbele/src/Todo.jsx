import axios from "axios"
import { useEffect, useState } from "react"

const BASE_URL = "http://localhost:4001/todo"

function Todo() {
    const [todos, setTodos] = useState([])
    const [todo, setTodo] = useState("")

    useEffect(() => {
        getTodos()
    }, [])

    const getTodos = () => {
        axios
            .get(`${BASE_URL}`)
            .then((res) => setTodos(res.data))
            .catch((err) => console.log(err))
    }
    const handleAddTodo = () => {
        axios
            .post(`${BASE_URL}/new`, {
                name: todo,
            })
            .then((res) => {
                setTodos([...todos, res.data])
                setTodo("")
            })
            .catch((err) => console.log(err))
    }
    const handleDeleteTodo = (id) => {
        axios
            .delete(`${BASE_URL}/delete/${id}`)
            .then((res) =>
                setTodos(todos.filter((todo) => todo._id !== res.data._id))
            )
            .catch((err) => console.log(err))
    }
    const handleTodoClick = (id) => {
        axios
            .get(`${BASE_URL}/ChangeStatus/${id}`)
            .then((res) => getTodos())
            .then(alert("Status Changed"))
            .catch((err) => console.error(err))
    }
    return (
        <div>
            <div className="input-group mb-3">
                <input value={todo} onChange={(e) => setTodo(e.target.value)}
                    placeholder="New" className="form-control" />
                <button onClick={handleAddTodo} className="btn btn-success">Add Todo</button>
            </div>
            <div className="container">
                {

                    todos.map((todo) => (
                        <div key={todo._id} className="card">
                            <div onClick={() => handleTodoClick(todo._id)}
                                className={todo.complete ? "complete card-body" : "card-boddy"}>
                                {todo.name}
                            </div>
                            <button onClick={() => handleDeleteTodo(todo._id)} className="btn btn-danger"
                            >Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Todo