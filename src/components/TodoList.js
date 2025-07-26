import { useState } from "react";

function TodoList({ todos, onMark, onUpdate, onDel}) {
    function handleKeyDown(e, todo) {
        if (e.key === "Enter") {
            handleUpdate(todo._id);
        }
    }

    const uncompleted = todos.filter(todo => !todo.completed);
    const completed = todos.filter(todo => todo.completed);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    const startEditing = (todo) => {
        setEditText(todo.text);
        setEditingId(todo._id);
    };

    const handleUpdate = (id) => {
        onUpdate(id, editText);
        setEditingId(null); // exit edit mode
    };
    
    const renderTodos = (list) => (
        list.map((todo) => (
            <li key={todo._id} className="flex items-center mb-2 border-2 p-2 pt-1 pb-1 rounded-md border-black">
                {editingId === todo._id ? (
                    <input
                        value = {editText}
                        onChange = {(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, todo)}
                        className = "flex-1 mr-3 border rounded resize-none"
                    />
                ) : (
                    <p 
                        className={`flex-1 min-w-0 mr-3 whitespace-pre-line break-words ${
                        todo.completed ? "line-through text-gray-400" : "text-black"
                        }`}
                    >
                        {todo.text}
                    </p>
                )}
                <div className="flex shrink-0">
                    <button onClick={() => onMark(todo._id)}
                    className="px-2 rounded-lg bg-green-500 hover:bg-green-600 mr-1
                    transition-colors duration-200">
                        <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 12.5L10.167 17L19.5 8" stroke="#000000"/>
                        </svg>
                    </button>

                    {editingId === todo._id ? (
                        <button onClick={() => handleUpdate(todo._id)}
                        className="py-1 px-2 rounded-lg bg-orange-500 hover:bg-orange-600 mr-1
                        transition-colors duration-200">
                                <xml version="1.0" encoding="utf-8"/>
                                <svg width="22px" height="22px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.765 2c1.187 0 1.363.06 1.51.168L21.662 4.7a.845.845 0 0 1 .339.677v15.78a.844.844 0 0 1-.844.844H2.844A.844.844 0 0 1 2 21.156V2.844A.844.844 0 0 1 2.844 2zM17 21v-7H7v7zM14 3v3h1V3zM7 3v6h10V3h-1v4h-3V3zM3 21h3v-8h12v8h3V5.452l-3-2.278v6.17a.769.769 0 0 1-.844.656H6.844A.769.769 0 0 1 6 9.344V3H3z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                        </button>
                    ) : (
                        <button onClick={() => startEditing(todo)}
                        className="py-1 px-2 rounded-lg bg-orange-500 hover:bg-orange-600 mr-1
                        transition-colors duration-200">
                            <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000"/>
                            <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000"/>
                            </svg>
                        </button>
                    )}

                    <button onClick={() => onDel(todo._id)} 
                    className="py-1 px-2 rounded-lg bg-red-500 hover:bg-red-600">
                        <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.0004 9.5L17.0004 14.5M17.0004 9.5L12.0004 14.5M4.50823 13.9546L7.43966 17.7546C7.79218 18.2115 7.96843 18.44 8.18975 18.6047C8.38579 18.7505 8.6069 18.8592 8.84212 18.9253C9.10766 19 9.39623 19 9.97336 19H17.8004C18.9205 19 19.4806 19 19.9084 18.782C20.2847 18.5903 20.5907 18.2843 20.7824 17.908C21.0004 17.4802 21.0004 16.9201 21.0004 15.8V8.2C21.0004 7.0799 21.0004 6.51984 20.7824 6.09202C20.5907 5.71569 20.2847 5.40973 19.9084 5.21799C19.4806 5 18.9205 5 17.8004 5H9.97336C9.39623 5 9.10766 5 8.84212 5.07467C8.6069 5.14081 8.38579 5.2495 8.18975 5.39534C7.96843 5.55998 7.79218 5.78846 7.43966 6.24543L4.50823 10.0454C3.96863 10.7449 3.69883 11.0947 3.59505 11.4804C3.50347 11.8207 3.50347 12.1793 3.59505 12.5196C3.69883 12.9053 3.96863 13.2551 4.50823 13.9546Z" stroke="#000000"/>
                        </svg>
                    </button>
                </div>
                </li>
        ))
    )
    
    return (
            <ul className="p-4">
                {renderTodos(uncompleted)}
                {renderTodos(completed)}
            </ul>
    );
}

export default TodoList;