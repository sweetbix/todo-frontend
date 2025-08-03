import nProgress from "nprogress";

function UserControl({ setShowRegister, setShowLogin, isLoggedIn, setIsLoggedIn }) {
    return (
    <div className="flex gap-3">
        {isLoggedIn ? 
            <button onClick={() => {
                nProgress.start();
                sessionStorage.removeItem("token");
                sessionStorage.setItem("username", "guest");
                setIsLoggedIn(false);
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