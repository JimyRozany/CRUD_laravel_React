import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../context/stateContext";

const DefaultLayout = () => {
    const { user, token } = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
        e.preventDefault();
    };
    return (
        <div className="flex">
            <aside className="w-[25%] bg-purple-700 px-6 py-4 h-screen">
                <ul className="text-white font-semibold text-2xl mt-5">
                    <li className=" hover:bg-gray-700 hover:bg-opacity-20 p-2">
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className=" hover:bg-gray-700 hover:bg-opacity-20 p-2">
                        <Link to="/users">Users</Link>
                    </li>
                </ul>
            </aside>
            <div className="w-[70%] p-4">
                <header className="w-100 px-3 py-5 shadow drop-shadow-2xl flex justify-between items-center">
                    <div className="">Header</div>
                    <div className="">
                        <p>{user.name}</p>
                        <a
                            href="#"
                            onClick={onLogout}
                            className="hover:bg-gray-700 hover:bg-opacity-10 "
                        >
                            logout
                        </a>
                    </div>
                </header>
                <main className="w-100 bg-slate-50 mt-5">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
