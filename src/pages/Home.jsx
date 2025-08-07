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
    const [active, setActive] = useState(0);
    const [completed, setCompleted] = useState(0);
    const backend = process.env.REACT_APP_API_URL;

    // check if user is logged in
    useEffect(() => {
      
      const checkLogin = async () => {
        try {
          console.log('Checking login...');
          console.log('Cookies before check:', document.cookie);
          
          const res = await axios.get(`${backend}/api/auth/check`, {
            withCredentials: true,
          })

          console.log('Check response:', res.data);
          setIsLoggedIn(true);
          setUsername(res.data.username);
        } catch (err) {
          console.error('Check login error:', err);
          setIsLoggedIn(false);
          setUsername("guest");
        } finally {
          setCheckingLogin(false);
        }
      }

      checkLogin();
      
    }, []);

    // initialise todos and count
    useEffect(() => {
      if (checkingLogin) return;

      const fetchTodos = async () => {

        if (isLoggedIn) {
          // fetch from backend
          const res = await axios.get(`${backend}/api/todos`, {
            withCredentials: true,
          })

          const resTodos = res.data;

          setTodos(resTodos);
          
          setActive(resTodos.filter(todo => !todo.completed).length);
          setCompleted(resTodos.filter(todo => todo.completed).length);

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
        const res = await axios.post(`${backend}/api/todos`, { text }, {
          withCredentials: true,
        });
        setTodos(prev => [...prev, res.data]);
      } else {
        nProgress.start();
        const newTodo = { id: Date.now(), text, completed: false };
        setTodos(prev => [...prev, newTodo]);
        nProgress.done();
      }

      setActive(prev => prev + 1);
    };

    const clearTodos = async () => {

      if (isLoggedIn) {
        await axios.delete(`${backend}/api/todos`, {
          withCredentials: true,
        });
      }

      setTodos([]);
      setActive(0);
      setCompleted(0);

    };

    const markTodo = async (markTodo) => {
      if (markTodo.completed) {
        return;
      }

      if (isLoggedIn) {
        try {
          await axios.put(`${backend}/api/todos/${markTodo._id}`, {
            completed: true },
            { 
              withCredentials: true,
            },
          );
          
          setTodos((prev) => prev.map((todo) => 
            todo === markTodo ? { ...todo, completed: true} : todo
            )
          );

        } catch (err) {

        }
      } else {
        nProgress.start();
        setTodos((prev) => prev.map((todo) => 
        todo === markTodo ? { ...todo, completed: true} : todo
        ));
        nProgress.done();
      }

      setActive(prev => prev - 1);
      setCompleted(prev => prev + 1);
    };

    const deleteTodo = async (delTodo) => {

      console.log(delTodo);
      if (isLoggedIn) {
        await axios.delete(`${backend}/api/todos/${delTodo._id}`, {
          withCredentials: true,
        }); 
        setTodos((prev) => prev.filter((todo) => todo !== delTodo));
      } else {
        nProgress.start();
        setTodos((prev) => prev.filter((todo) => todo !== delTodo));
        nProgress.done();
      }

      if (delTodo.completed) {
        setCompleted(prev => prev - 1);
      } else {
        setActive(prev => prev - 1);
      }


    };

    const updateTodo = async (id, newText) => {
      if (isLoggedIn) {
        await axios.put(`${backend}/api/todos/${id}`, {text: newText}, {
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
                <FilterBar filter={filter} setFilter={setFilter} active={active} completed={completed} />
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