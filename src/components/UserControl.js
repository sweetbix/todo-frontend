function UserControl({ setShowRegister, setShowLogin, isLoggedIn, setIsLoggedIn }) {
    return (
    <div className="flex gap-3">
        {isLoggedIn ? 
            <button onClick={() => {
                sessionStorage.removeItem("token");
                setIsLoggedIn(false);
            }}
            className="text-md border-2 p-1 border-black rounded-lg  bg-green-300
            hover:bg-green-400 transition-colors duration-200" >Log out</button>
        : (
        <>
        <button onClick={() => setShowRegister(true)} className="text-md border-2 p-1 border-black rounded-lg bg-green-300
        hover:bg-green-400 transition-colors duration-200">
            Register
        </button>

        <button onClick={() => setShowLogin(true)} className="text-md border-2 p-1 border-black rounded-lg  bg-green-300
        hover:bg-green-400 transition-colors duration-200">
            Login
        </button>
        </>
        )}
    </div>
    )
}

export default UserControl;