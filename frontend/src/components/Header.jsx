import { Link } from "react-router-dom";
import "../../src/main.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">My Todo App</div>
      <nav>
        <Link to="/todolist">Todos</Link>
        <Link to="/add-todo">Add Todo</Link>
        <Link to="/login" className="login-btn">Login</Link>
      </nav>
    </header>
  );
}
