function Clear({ onClear} ) {
    const handleClear = async () => {
        try {
            await fetch("http://localhost:3001/api/todos", {
                method: "DELETE"
            });

            if (onClear) onClear();
        } catch (err) {
            console.error("Failed to clear tasks", err);
        }
    };

    return (
        <button className="w-full bg-red-600 rounded-md my-5 py-2 text-xl text-white hover:bg-red-700"
        type="submit"
        onClick={handleClear}>
            Clear
        </button>
    );
}

export default Clear;