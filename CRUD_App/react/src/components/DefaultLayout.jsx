import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
import { useEffect } from "react";
import axiosClient from "../axios-client";

const DefaultLayout = () => {
    const { user, token ,setUser ,setToken ,notification} = useStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout')
        .then(()=>{
            setUser({})
            setToken(null)
        })
    };

    useEffect(()=>{

        axiosClient.get('user')
        .then(({data})=>{
            // debugger
            setUser(data)
        })
    } ,[])
    return (
        <div className="flex">
            <aside className="w-[25%] bg-purple-700 px-6 py-4 min-h-full">
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
                        <Link
                            to="#"
                            onClick={onLogout}
                            className="hover:bg-gray-700 hover:bg-opacity-10 "
                        >
                            logout
                        </Link>
                    </div>
                </header>
                <main className="w-100 bg-slate-50 mt-5 relative">
                    <Outlet />
                    {
                        notification && <div className="absolute top-10 right-5 bg-green-400 text-white text-xl px-3 py-4 rounded-lg">
                            {notification}
                        </div>
                    }
                </main>
                
            </div>
        </div>
    );
};

export default DefaultLayout;
