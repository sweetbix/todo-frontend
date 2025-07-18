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
            className="border border-gray-300 px-2 py-1 rounded w-full"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task"
            />
            
            <button className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-700"
            type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm