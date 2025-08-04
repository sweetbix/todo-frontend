import nProgress from "nprogress";
import axios from "axios";


function UserControl({ setShowRegister, setShowLogin, isLoggedIn, setIsLoggedIn }) {
    const logout = async () => {
        try {
            await axios.post("api/auth/logout", {}, {
                withCredentials: true,
            });

            sessionStorage.removeItem("username");
            setIsLoggedIn(false);
        } catch (err) {
            console.log("Logout failed", err);
        }
    };
    
    
    
    return (
    <div className="flex gap-3">
        {isLoggedIn ? 
            <button onClick={() => {
                nProgress.start();
                logout();
                nProgress.done();
            }}
            className="text-md border-2 p-1 px-2 border-black rounded-lg  bg-green-300
            hover:bg-green-400 transition-colors duration-200" >Log out</button>
        : (
        <>
        <button onClick={() => setShowRegister(true)} className="text-md border-2 p-1 px-2 border-black rounded-lg bg-green-300
        hover:bg-green-400 transition-colors duration-200">
            Register
        </button>

        <button onClick={() => setShowLogin(true)} className="text-md border-2 p-1 px-2 border-black rounded-lg  bg-green-300
        hover:bg-green-400 transition-colors duration-200">
            Login
        </button>
        </>
        )}
    </div>
    )
}

export default UserControl;