import { useEffect, useState } from "react";
import axiosClient from '../axios-client';
import { Link } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
const Users = () => {
    const [users ,setUsers] = useState([])
    const [loading ,setLoading] = useState(false)
    const {setNotification} = useStateContext();
    
    useEffect(()=>{
        getUsers()
    },[])
    
    const onDelete = (user) => {
        if(!window.confirm('are you sure you want to delete this "User" ')){
            return
        }
        
        axiosClient.delete(`/users/${user.id}`)
        .then(()=>{
            setNotification("user deleted successfully");
            getUsers();
        })
    }
    
    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
        .then(({data})=>{
            
            setLoading(false)
            console.log(data);
            setUsers(data.data)
            
        })
        .catch(()=>{
            setLoading(false)
        })
    }
    
    return <div className="container">
        <h2 className="text-2xl">Users</h2>
        <Link className="bg-white text-purple-700 py-2 px-5 border border-purple-700 rounded-md inline-block mt-2 hover:bg-purple-700 hover:text-white duration-500" to="/users/new">Add New</Link>
        <div className="mt-4">
            <table className="table-auto text-gray-500 dark:text-gray-400">
                <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">id</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Created at</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                {
                    loading && <tbody>
                        <tr>
                            <td colSpan='5' className="text-center">Loading ..... </td>
                        </tr>
                    </tbody>
                }
                <tbody>
                    {
                        
                        users.map((user) =>
                            (
                            <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">{user.id}</td>
                                <td className="px-6 py-4">{user.name} </td>
                                <td className="px-6 py-4">{user.email} </td>
                                <td className="px-6 py-4">{user.created_at} </td>
                                <td className="px-6 py-4"><Link to={'/users/'+user.id}>Edit</Link> 
                                <button className="border px-3 py-2 rounded-md hover:text-white" onClick={(ev) => onDelete(user)}>Delete</button>
                                </td>
                            </tr>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
    </div>;
};

export default Users;
