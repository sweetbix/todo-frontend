import AddTodoForm from "./components/AddTodoForm.js";
import TodoList from "./components/TodoList.js";
import Clear from "./components/Clear.js";
import React, { useEffect, useState} from "react";


function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json()
      .then((data) => setTodos(data)))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = async (text) => {
  try {
    const response = await fetch("http://localhost:3001/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ text })
    });

    const newTodo = await response.json();
    //setTodos([...todos, newTodo]);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  } catch (err) {
    console.error("Failed to add task", err);
    }
  }

  const clearTodos = () => {
    setTodos([]);
  }

  const markTodo = async (id) => {
    await fetch(`api/todos/${id}`, {
      method: "PUT"
    });

    setTodos(prev => 
      prev.map(todo => 
        todo._id === id ? {...todo, completed: true} : todo
      )
    );
  }

  const deleteTodo = async (id) => {
    await fetch(`api/todos/${id}`, {
      method: "DELETE"
    });

    setTodos(prev => 
      prev.filter(todo => todo._id !== id)
    );
  }




  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-5xl font-bold text-center text-slate-800">Todo App</h1>
        <TodoList todos={todos} onMark={markTodo} onDel={deleteTodo}/>

        <AddTodoForm onAdd={addTodo} />

        <Clear onClear={clearTodos}/>
    </div>
  );
}




export default App;
