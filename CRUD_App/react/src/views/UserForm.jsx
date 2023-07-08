import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/stateContext";

const UserForm = ()=>{

    const {setNotification} = useStateContext();
    const {id} = useParams();
    const navigate = useNavigate()
    const [loading ,setLoading] = useState(false);
    const [errors ,setErrors] = useState(null);
    const [user ,setUser] = useState({
        id:null,
        name:'',
        email:'',
        password:'',
        password_confirmation:''
    });

    if(id){
        useEffect(()=>{
            setLoading(true)
            axiosClient.get(`/users/${id}`)
            .then(({data})=>{
                setLoading(false);
                setUser(data)
            })
            .catch(()=>{
                setLoading(false)
            })
        } ,[])
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // debugger
        if(user.id){
            // debugger
            axiosClient.put(`/users/${user.id}` ,user)
            .then(()=>{
                setNotification("user was successfully updated" );
                navigate('/users')
            })
            .catch((err)=>{
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors)
                }
            })
        }else{
            //  
            axiosClient.post(`/users` ,user)
            .then(()=>{
                setNotification("user was successfully created" );
                navigate('/users')
            })
            .catch((err)=>{
                const response = err.response;
                if(response && response.status === 422){
                    setErrors(response.data.errors)
                }
            })
        }
    }

return (
    <div className="container">
        {user.id && <h2>Update User : {user.name}</h2>}
        {!user.id && <h2>New User</h2>}
        {loading && <div className="text-center text-2xl">Loading ..... </div>}
        
         {
            errors && <div className="bg-pink-500 text-white p-4 rounded-lg bg-opacity-70">
                {
                    Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))
                }
            </div>
        } 
        {!loading &&
            <form onSubmit={(e) => onSubmit(e)} className="mt-5 flex flex-col items-center gap-2">
                <input className="p-3 outline outline-1 rounded-md text-purple-500 focus:outline-2 focus:outline-purple-700 focus:drop-shadow-lg shadow-md focus:shadow-pink-500/50" onChange={(e)=>setUser({...user ,name:e.target.value})} type="text"placeholder="name" value={user.name} />
                <input className="p-3 outline outline-1 rounded-md text-purple-500 focus:outline-2 focus:outline-purple-700 focus:drop-shadow-lg shadow-md focus:shadow-pink-500/50" onChange={(e)=>setUser({...user ,email:e.target.value})} type="email"placeholder="email" value={user.email}/>
                <input className="p-3 outline outline-1 rounded-md text-purple-500 focus:outline-2 focus:outline-purple-700 focus:drop-shadow-lg shadow-md focus:shadow-pink-500/50" onChange={(e)=>setUser({...user ,password:e.target.value})} type="password"placeholder="password" />
                <input className="p-3 outline outline-1 rounded-md text-purple-500 focus:outline-2 focus:outline-purple-700 focus:drop-shadow-lg shadow-md focus:shadow-pink-500/50" onChange={(e)=>setUser({...user ,password_confirmation:e.target.value})} type="password"placeholder="password confirmation" />
                <button className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-900 duration-300">Save</button>
            </form> 
        }
        
    
    </div>
)    
}

export default UserForm ;