import { useState } from "react";

function AddTodoForm({ onAdd }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text.trim()) {
            onAdd(text);
            setText("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
            <input
            className="border border-gray-500 px-2 py-1 rounded-lg w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task"
            />
            
            <button className="be px-4 py-1 rounded-lg bg-yellow-500 hover:bg-yellow-400 border-2 border-black
            transition-colors duration-200"
            type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm