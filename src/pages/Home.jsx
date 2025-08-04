import AddTodoForm from "../components/AddTodoForm.js";
import TodoList from "../components/TodoList.js";
import Clear from "../components/Clear.js";
import FilterBar from "../components/FilterBar.js";
import UserControl from "../components/UserControl.js";
import RegisterForm from "../components/RegisterForm.js";
import LoginForm from "../components/LoginForm.js";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

function Home() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const checkLogin = async () => {
        try {
          const res = await axios.get("api/auth/check", {
            withCredentials: true,
          })

          setIsLoggedIn(true);
          sessionStorage.setItem("username", res.data.username);
        } catch {
          setIsLoggedIn(false);
          sessionStorage.removeItem("username");
        }
      }

      checkLogin();
    }, []);


    useEffect(() => {
      const fetchTodos = async () => {
        if (isLoggedIn) {
          // fetch from backend
          const res = await axios.get("api/todos", {
            withCredentials: true,
          })

          setTodos(res.data);

        } else {
          setTodos([]);
        }
      }

      
      fetchTodos();
    }, [isLoggedIn]);

    const addTodo = async (text) => {
      if (isLoggedIn) {
        const res = await axios.post("api/todos", { text }, {
          withCredentials: true,
        });
        setTodos(prev => [...prev, res.data]);
      } else {
        const newTodo = { id: Date.now(), text, completed: false };
        setTodos(prev => [...prev, newTodo]);
      }
    };

    const clearTodos = async () => {
      if (isLoggedIn) {
        await axios.delete("api/todos", {
          withCredentials: true,
        });
      }

      setTodos([]);
    };

    const markTodo = async (id) => {
      if (isLoggedIn) {
        try {
          await axios.put(`api/todos/${id}`, {
            completed: true },
            { 
              withCredentials: true,
            },
          );
          
          setTodos((prev) => prev.map((todo) => 
            todo._id === id ? { ...todo, completed: true} : todo
            )
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
      if (isLoggedIn) {
        await axios.delete(`api/todos/${id}`, {
          withCredentials: true,
        }); 

        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      } else {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
    };

    const updateTodo = async (id, newText) => {
      if (isLoggedIn) {
        await axios.put(`api/todos/${id}`, {text: newText}, {
          withCredentials: true,
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

    function usernameDisplay(username) {
      if (username.endsWith("s")) {
        return username + 's\'';
      } else {
        return username + '\'s';
      }
    }

    const onCloseR = () => {
      setShowRegister(false)
    }

    const onCloseL = () => {
      setShowLogin(false);
    }


    return (
        <div className="flex flex-col min-h-screen bg-blue-300 justify-center">
            <div className="flex fixed top-4 right-4">
              <UserControl setShowRegister={setShowRegister} setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            </div>

            { showRegister && (
              <RegisterForm showRegister={showRegister} onClose={onCloseR} setIsLoggedIn={setIsLoggedIn} />
            )}

            { showLogin && (
              <LoginForm showLogin={showLogin} onClose={onCloseL} setIsLoggedIn={setIsLoggedIn} />
            )}

            <div className="px-[5%] sm:px-[10%] md:px-[20%] lg:px-[30%]">
              <div className="flex align-middle justify-between mb-4 sticky top-0 py-3 bg-blue-300">
                <h2 className="flex-1 text-3xl font-bold text-black"><span className="text-green-800">{usernameDisplay(sessionStorage.getItem("username") || "guest")}</span> To Do List</h2>
                <FilterBar filter={filter} setFilter={setFilter} />
              </div>

              <TodoList todos={filteredTodos} onMark={markTodo} onUpdate={updateTodo} onDel={deleteTodo} isLoggedIn={isLoggedIn} filter={filter} 
              />

              <div className="bg-blue-300 pt-1 sticky bottom-0">
                <AddTodoForm onAdd={addTodo} />

                <Clear onClear={clearTodos}/>
              </div>
            </div>
        </div>
    );
}

export default Home