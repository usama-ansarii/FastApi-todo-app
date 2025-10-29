import { useState, useEffect } from "react";
import { ApiRequest } from "../services/ApiRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate()


  const getAllTodos = async ()=>{
    try {
      const res = await ApiRequest.getTodo()
      const data =  res?.data
      console.log(data)
      setTodos(data)

    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  
  

  useEffect(() => {
    getAllTodos()
  }, []);

  const handleUpdate = (id) => {
    navigate(`/edit/${id}`)
  };

  const handleDelete = async (id) => {
    try {
      const res = await ApiRequest.deleteTodo(id)
      getAllTodos()
    } catch (error) {
      console.error("Error deleting todo:", error);
      
    }
  };

  return (
    <div className="todo-list">
      <h2>My Todos</h2>
      {todos.length === 0 ? (
        <p className="no-todos">No todos yet!</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <h3>{todo.task}</h3>
              <p>{todo.description}</p>
              <div className="actions">
                <button className="edit" onClick={() => handleUpdate(todo._id)}>
                  Update
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(todo._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
