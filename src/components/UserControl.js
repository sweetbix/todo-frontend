import { Link } from "react-router-dom";

function UserControl() {
    return (
    <div className="flex gap-3">
        <Link to="/register" className="text-md border-2 p-1 border-black rounded-lg bg-green-300
        hover:bg-green-400 transition-colors duration-200">Register</Link   >

        <Link to="/login" className="text-md border-2 p-1 border-black rounded-lg  bg-green-300
        hover:bg-green-400 transition-colors duration-200">Login</Link>
    </div>
    )
}

export default UserControl;