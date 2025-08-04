function FilterBar({ filter, setFilter }) {
    const handleClick = (e) => {
        setFilter(e)
    }
    
    return (
        <div className="flex align-middle gap-1">
            <button onClick={() => handleClick('all')}
            className={`border-2 border-black p-1 px-2 rounded-lg transition-colors duration-200  
            ${filter === "all" ? "bg-yellow-300" : "hover:bg-yellow-300 bg-yellow-500"}`}>All</button>
            
            <button onClick={() => handleClick('active')}
            className={`border-2 border-black p-1 px-2 rounded-lg transition-colors duration-200  
            ${filter === "active" ? "bg-yellow-300" : "hover:bg-yellow-300 bg-yellow-500"}`}>Active</button>
            
            <button onClick={() => handleClick('completed')}
            className={`border-2 border-black p-1 px-2 rounded-lg transition-colors duration-200  
            ${filter === "completed" ? "bg-yellow-300" : "hover:bg-yellow-300 bg-yellow-500"}`}>Completed</button>
        </div>
    )
}

export default FilterBar