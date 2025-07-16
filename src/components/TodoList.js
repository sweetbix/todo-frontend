import React, { useEffect, useState} from "react";

function TodoList() {
    const [todos, setTodos] = useState([]);

    // Fetch todos on component mount
    useEffect(() => {
        fetch("/api/todos") // Hits express backend
        .then((res) => res.json())
        .then((data) => {
            setTodos(data);
        })
        .catch((err) => console.log("Error fetching todos:", err));
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-green-300">My Todos</h2>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id} className="mb-2">
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;