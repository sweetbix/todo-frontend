import axios from "axios";


function UserControl({ setShowRegister, setShowLogin, isLoggedIn, setIsLoggedIn, setUsername }) {
    const backend = process.env.REACT_APP_API_URL;
    
    const logout = async () => {
        try {
            await axios.post(`${backend}api/auth/logout`, {}, {
                withCredentials: true,
            });

            setUsername("guest");
            setIsLoggedIn(false);
        } catch (err) {
            console.log("Logout failed", err);
        }
    };
    
    
    return (
    <div className="flex gap-3">
        {isLoggedIn ? 
            <button onClick={() => {
                logout();
            }}
            className="text-md border-2 p-1 px-2 border-black rounded-lg  bg-yellow-500
            hover:bg-yellow-400 transition-colors duration-200" >Log out</button>
        : (
        <>
        <button onClick={() => setShowRegister(true)} className="text-md border-2 p-1 px-2 border-black rounded-lg bg-yellow-500
        hover:bg-yellow-400 transition-colors duration-200">
            Register
        </button>

        <button onClick={() => setShowLogin(true)} className="text-md border-2 p-1 px-2 border-black rounded-lg  bg-yellow-500
        hover:bg-yellow-400 transition-colors duration-200">
            Login
        </button>
        </>
        )}
    </div>
    )
}

export default UserControl;