function UserControl({ setShowRegister }) {
    return (
    <div className="flex gap-3">
        <button onClick={() => setShowRegister(true)} className="text-md border-2 p-1 border-black rounded-lg bg-green-300
        hover:bg-green-400 transition-colors duration-200">Register</button>

        <button to="/login" className="text-md border-2 p-1 border-black rounded-lg  bg-green-300
        hover:bg-green-400 transition-colors duration-200">Login</button>
    </div>
    )
}

export default UserControl;