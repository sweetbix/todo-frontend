function Clear({ onClear } ) {
    return (
        <button className="w-full bg-red-600 rounded-xl my-5 py-1 text-xl text-white hover:bg-red-700
        transition-colors duration-200"
        type="submit"
        onClick={onClear}>
            Clear
        </button>
    );
}

export default Clear;