import AddTodoForm from "./components/AddTodoForm.js";
import TodoList from "./components/TodoList.js";
import Clear from "./components/Clear.js";
import { useEffect, useState} from "react";


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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({ completed: true}),
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

  const updateTodo = async (id, newText) => {
    await fetch(`api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text : newText}),
    });

    setTodos((prev) => 
      prev.map((todo) => 
        todo._id === id ? {...todo, text: newText} : todo  
      )
    );
  };




  return (
    <div className="flex flex-col min-h-screen bg-blue-300 px-[35%] justify-center">
        <TodoList todos={todos} onMark={markTodo} onUpdate={updateTodo} onDel={deleteTodo}/>

        <AddTodoForm onAdd={addTodo} />

        <Clear onClear={clearTodos}/>
    </div>
  );
}




export default App;
