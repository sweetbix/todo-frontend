function FilterBar({ filter, setFilter }) {
    const handleClick = (e) => {
        setFilter(e)
        console.log(filter)
    }


    return (
        <div className="flex align-middle gap-1">
            <button onClick={() => handleClick('all')}
            className={`border-2 border-black p-1 px-2 rounded-lg bg-purple-500 
            ${filter === "all" ? "bg-pink-500" : "hover:bg-pink-500"}`}>all</button>
            
            <button onClick={() => handleClick('active')}
            className={`border-2 border-black p-1 px-2 rounded-lg bg-purple-500 
            ${filter === "active" ? "bg-pink-500" : "hover:bg-pink-500"}`}>active</button>
            
            <button onClick={() => handleClick('completed')}
            className={`border-2 border-black p-1 px-2 rounded-lg bg-purple-500 
            ${filter === "completed" ? "bg-pink-500" : "hover:bg-pink-500"}`}>completed</button>
        </div>
    )
}

export default FilterBar