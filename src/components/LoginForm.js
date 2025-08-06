import { useState, useEffect } from "react";
import axios from "axios";

function LoginForm({ showLogin, onClose, setIsLoggedIn, setUsernameGlobal }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const backend = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        
        if (showLogin) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        }
    }, [showLogin, onClose]);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        try {
            setLoading(true);
            await axios.post(`${backend}/api/auth/login`, { username, password });

            setUsernameGlobal(username);
            setIsLoggedIn(true);
            onClose();
        } catch (err) {
            setErrorMsg(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div onClick={(e) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}
        className="flex justify-center items-center bg-black bg-opacity-50 z-50 fixed inset-0">
            <div className="flex flex-col bg-grey1 w-[60%] sm:w-[50%] md:w-[40%] lg:w-[25%] rounded-xl
            relative z-5">
                <h1 className="text-2xl font-bold text-center pt-4 text-yellow-500">Sign in</h1>

                <button onClick={onClose} className="absolute top-2 right-2 z-10 hover:bg-gray-600 rounded-md"> 
                    
                <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24"/>
                <path d="M7 17L16.8995 7.10051" stroke="#eab308" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 7.00001L16.8995 16.8995" stroke="#eab308" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                </button>

                <form className="flex flex-col gap-2 px-7 mt-4" onSubmit={handleSubmit}>
                    
                    <div className="flex flex-col gap-1">
                        <input className="rounded-md p-1 focus:ring-2 focus:outline-none focus:ring-yellow-500"
                        value={username}
                        placeholder="Username"
                        onChange={(e) => {
                            setUsername(e.target.value)
                            setErrorMsg(null);
                        }
                        }/>

                    </div>  
                    <div className="flex flex-col gap-1">    
                        
                        <div className="flex items-center relative">
                            <input className="flex-1 rounded-md p-1 focus:ring-2 focus:outline-none focus:ring-yellow-500 sm:pr-9"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorMsg(null);
                            }}
                            />

                            <div className="z-10 absolute right-2 flex">
                                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? 
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.5868 13.7788C5.36623 15.5478 8.46953 17.9999 12.0002 17.9999C15.5308 17.9999 18.6335 15.5478 20.413 13.7788C20.8823 13.3123 21.1177 13.0782 21.2671 12.6201C21.3738 12.2933 21.3738 11.7067 21.2671 11.3799C21.1177 10.9218 20.8823 10.6877 20.413 10.2211C18.6335 8.45208 15.5308 6 12.0002 6C8.46953 6 5.36623 8.45208 3.5868 10.2211C3.11714 10.688 2.88229 10.9216 2.7328 11.3799C2.62618 11.7067 2.62618 12.2933 2.7328 12.6201C2.88229 13.0784 3.11714 13.3119 3.5868 13.7788Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        : 
                                        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path id="Vector" d="M3.99989 4L19.9999 20M16.4999 16.7559C15.1473 17.4845 13.6185 17.9999 11.9999 17.9999C8.46924 17.9999 5.36624 15.5478 3.5868 13.7788C3.1171 13.3119 2.88229 13.0784 2.7328 12.6201C2.62619 12.2933 2.62616 11.7066 2.7328 11.3797C2.88233 10.9215 3.11763 10.6875 3.58827 10.2197C4.48515 9.32821 5.71801 8.26359 7.17219 7.42676M19.4999 14.6335C19.8329 14.3405 20.138 14.0523 20.4117 13.7803L20.4146 13.7772C20.8832 13.3114 21.1182 13.0779 21.2674 12.6206C21.374 12.2938 21.3738 11.7068 21.2672 11.38C21.1178 10.9219 20.8827 10.6877 20.4133 10.2211C18.6338 8.45208 15.5305 6 11.9999 6C11.6624 6 11.3288 6.02241 10.9999 6.06448M13.3228 13.5C12.9702 13.8112 12.5071 14 11.9999 14C10.8953 14 9.99989 13.1046 9.99989 12C9.99989 11.4605 10.2135 10.9711 10.5608 10.6113" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        }
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="h-5">
                        <p className={`text-xs text-center text-red-600`}>{errorMsg}</p>
                    </div>  
                    
                    <button type="submit" disabled={errorMsg !== null || loading} className="mx-auto text-md
                    rounded-3xl mb-7 p-1 w-full bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50
                    disabled:cursor-not-allowed">Log in
                    </button>
                </form>
            </div>
        </div>
    )

}

export default LoginForm