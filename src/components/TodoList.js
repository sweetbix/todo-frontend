function TodoList({ todos, onMark, onDel}) {
    const uncompleted = todos.filter(todo => !todo.completed);
    const completed = todos.filter(todo => todo.completed);
    
    const renderTodos = (list) => (
        list.map((todo) => (
            <li key={todo._id} className="flex items-center mb-2 border-2 p-1 pl-3 rounded-md border-black">
                <p 
                    className={`flex-1 pr-2 ${
                    todo.completed ? "line-through text-gray-400" : "text-black"
                    }`}
                >
                    {todo.text}
                </p>

                <button onClick={() => onMark(todo._id)}
                className="py-1 px-2 border-2 bg-green-500 mr-1 w-14">mark</button>

                <button 
                className="py-1 px-2 border-2 bg-orange-500 mr-1">edit</button>

                <button onClick={() => onDel(todo._id)} 
                className="py-1 px-2 border-2 bg-red-500">del</button>
                
                </li>
        ))
    )
    
    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-4 text-green-300">My Todos</h2>
            <ul>
                {renderTodos(uncompleted)}
                {renderTodos(completed)}
            </ul>
        </div>
    );
}

export default TodoList;