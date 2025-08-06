function FilterBar({ filter, setFilter, active, completed }) {
    const handleClick = (e) => {
        setFilter(e)
    }
    
    return (
        <div className="flex align-middle gap-1">
            <button onClick={() => handleClick('all')}
            className={`border-2 border-black p-1 px-2 rounded-lg transition-colors duration-200  
            ${filter === "all" ? "bg-yellow-300" : "hover:bg-yellow-300 bg-yellow-500"}`}>All ({active + completed})</button>
            
            <button onClick={() => handleClick('active')}
            className={`border-2 border-black p-1 px-2 rounded-lg transition-colors duration-200  
            ${filter === "active" ? "bg-yellow-300" : "hover:bg-yellow-300 bg-yellow-500"}`}>Active ({active})</button>
            
            <button onClick={() => handleClick('completed')}
            className={`border-2 border-black p-1 px-2 rounded-lg transition-colors duration-200  
            ${filter === "completed" ? "bg-yellow-300" : "hover:bg-yellow-300 bg-yellow-500"}`}>Completed ({completed})</button>
        </div>
    )
}

export default FilterBar