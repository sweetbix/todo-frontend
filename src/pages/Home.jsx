import AddTodoForm from "../components/AddTodoForm.js";
import TodoList from "../components/TodoList.js";
import Clear from "../components/Clear.js";
import FilterBar from "../components/FilterBar.js";
import UserControl from "../components/UserControl.js";
import RegisterForm from "../components/RegisterForm.js";
import LoginForm from "../components/LoginForm.js";
import { useEffect, useState, useMemo } from "react";
import axios from "../utils/axiosConfig.js";
import nProgress from "nprogress";

function Home() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingLogin, setCheckingLogin] = useState(true);
    const [loadingTodos, setLoadingTodos] = useState(true);
    const [username, setUsername] = useState("guest");

    useEffect(() => {
      
      const checkLogin = async () => {
        try {
          const res = await axios.get("api/auth/check", {
            withCredentials: true,
          })

          setIsLoggedIn(true);
          setUsername(res.data.username);
        } catch {
          setIsLoggedIn(false);
          setUsername("guest");
        } finally {
          setCheckingLogin(false);
        }
      }

      checkLogin();
      
    }, []);


    useEffect(() => {
      if (checkingLogin) return;

      const fetchTodos = async () => {

        if (isLoggedIn) {
          // fetch from backend
          const res = await axios.get("api/todos", {
            withCredentials: true,
          })

          setTodos(res.data);

        } else {
          nProgress.start();
          setTodos([]);
          nProgress.done();
        }

        setLoadingTodos(false)
      }
      
      fetchTodos();
    }, [isLoggedIn, checkingLogin]);

    const addTodo = async (text) => {
      if (isLoggedIn) {
        const res = await axios.post("api/todos", { text }, {
          withCredentials: true,
        });
        setTodos(prev => [...prev, res.data]);
      } else {
        nProgress.start();
        const newTodo = { id: Date.now(), text, completed: false };
        setTodos(prev => [...prev, newTodo]);
        nProgress.done();
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

        }
      } else {
        nProgress.start();
        setTodos((prev) => prev.map((todo) => 
        todo.id === id ? { ...todo, completed: true} : todo
        ));
        nProgress.done();
      }
    };

    const deleteTodo = async (id) => {
      if (isLoggedIn) {
        await axios.delete(`api/todos/${id}`, {
          withCredentials: true,
        }); 

        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      } else {
        nProgress.start();
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        nProgress.done();
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
        nProgress.start();
        setTodos((prev) => 
          prev.map((todo) => 
            todo.id === id ? {...todo, text: newText} : todo  
          )
        );
        nProgress.done();
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

    if (checkingLogin || loadingTodos) {
      return (
        <div className="bg-grey1 w-full min-h-screen"></div>
      )
    }

    return (
        <div className="flex flex-col min-h-screen bg-grey1 justify-center">
            
            <div className="flex fixed top-4 right-4">
              <UserControl setShowRegister={setShowRegister} setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername}/>
            </div>
            
            { showRegister && (
              <RegisterForm showRegister={showRegister} onClose={onCloseR} setIsLoggedIn={setIsLoggedIn} setUsernameGlobal={setUsername}/>
            )}

            { showLogin && (
              <LoginForm showLogin={showLogin} onClose={onCloseL} setIsLoggedIn={setIsLoggedIn} setUsernameGlobal={setUsername} />
            )}

            <div className="px-[5%] sm:px-[10%] md:px-[20%] lg:px-[30%]">
              <div className="flex align-middle justify-between mb-4 sticky top-0 py-3 bg-grey1">
                <h2 className="flex-1 text-3xl font-bold text-yellow-500"><span className="text-beige1">{usernameDisplay(username)}</span> To Do List</h2>
                <FilterBar filter={filter} setFilter={setFilter} />
              </div>

              <TodoList todos={filteredTodos} onMark={markTodo} onUpdate={updateTodo} onDel={deleteTodo} isLoggedIn={isLoggedIn} filter={filter} 
              username={username} />

              <div className="pt-1 sticky bottom-0 bg-grey1">
                <AddTodoForm onAdd={addTodo} />

                <Clear onClear={clearTodos}/>
              </div>
            </div>
        </div>
    );
}

export default Home