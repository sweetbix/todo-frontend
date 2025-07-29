import AddTodoForm from "../components/AddTodoForm.js";
import TodoList from "../components/TodoList.js";
import Clear from "../components/Clear.js";
import FilterBar from "../components/FilterBar.js";
import UserControl from "../components/UserControl.js";
import RegisterForm from "../components/RegisterForm.js";
import { isLoggedIn } from "../utils/auth.js";
import { useEffect, useState, useMemo} from "react";
import axios from "axios";

function Home() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        if (isLoggedIn()) {
        // fetch from backend
        axios.get("api/todos", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
            }).then(res => setTodos(res.data));
        }
    }, []);

    const addTodo = async (text) => {
      if (isLoggedIn()) {
        const res = await axios.post("api/todos", { text }, {
          headers: { Authorisation: `Bearer ${localStorage.getItem("token")}` },
        });
        setTodos(prev => [...prev, res.data]);
      } else {
        const newTodo = { id: Date.now(), text, completed: false };
        setTodos(prev => [...prev, newTodo]);
      }
    };

    const clearTodos = async () => {
      if (isLoggedIn()) {
        await axios.delete("api/todos", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }

      setTodos([]);
    };

    const markTodo = async (id) => {
      if (isLoggedIn()) {
        try {
          await axios.put(`api/todos/${id}`, {
            completed: true },
            { 
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            },
          );
        } catch (err) {
          console.error("Failed to update todos:", err);
          return;
        }
      } else {
        setTodos((prev) => prev.map((todo) => 
        todo.id === id ? { ...todo, completed: true} : todo
        )
        );
      }
    };

    const deleteTodo = async (id) => {
      if (isLoggedIn()) {
        await axios.delete(`api/todos/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}`},
        }); 

        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      } else {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
    };

    const updateTodo = async (id, newText) => {
      if (isLoggedIn()) {
        await axios.put(`api/todos/${id}`, {text: newText}, {
          headers: {Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        });

        setTodos((prev) => 
          prev.map((todo) => todo._id === id ? {...todo, text: newText } : todo
          )
        );

      } else {
        setTodos((prev) => 
          prev.map((todo) => 
            todo.id === id ? {...todo, text: newText} : todo  
          )
        );
        console.log("updated");
      }
    };

    const filteredTodos = useMemo(() => {
      switch (filter) {
        case 'active': 
          return todos.filter(t => !t.completed);
        case 'completed':
          return todos.filter(t => t.completed);
        default:
          return todos
      }
    }, [todos, filter])

    const onClose = () => {
      setShowRegister(false)
    }


    return (
        <div className="flex flex-col min-h-screen bg-blue-300 justify-center">
            <div className="flex fixed top-4 right-4">
              <UserControl setShowRegister={setShowRegister}/>
            </div>

            { showRegister && (
              <RegisterForm showRegister={showRegister} onClose={onClose} />
            )}

            <div className="px-[5%] sm:px-[10%] md:px-[20%] lg:px-[30%]">
              <div className="flex align-middle justify-between mb-4 sticky top-0 py-2 bg-blue-300">
                <h2 className="flex-1 text-3xl font-bold text-black">My To Do List</h2>
                <FilterBar filter={filter} setFilter={setFilter} />
              </div>

              <TodoList todos={filteredTodos} onMark={markTodo} onUpdate={updateTodo} onDel={deleteTodo}/>

              <div className="bg-blue-300 sticky bottom-0">
                <AddTodoForm onAdd={addTodo} />

                <Clear onClear={clearTodos}/>
              </div>
            </div>
        </div>
    );
}

export default Home