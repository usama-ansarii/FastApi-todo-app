import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import AddTodo from "./pages/AddTodo";
import TodoList from "./pages/TodoList";
import "../src/main.scss";
import { ToastContainer } from "react-toastify";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<AddTodo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-todo" element={<AddTodo />} />
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/edit/:id" element={<AddTodo />} />


        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  );
}

export default App;
