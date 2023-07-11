import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
import axiosClient from "../axios-client";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const { setUser, setToken } = useStateContext();

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    // console.log(response.data.errors);
                    if (response.data.error) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({ email: [response.data.message] });
                        // setErrors({
                        //     email:[response.data.message]
                        // })
                    }
                }
            });
    };
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <h3 className="text-center text-3xl text-purple-600">login</h3>
            {errors && (
                <div className="bg-pink-500 text-white p-4 rounded-lg bg-opacity-70">
                    {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>
            )}
            <input
                ref={emailRef}
                type="email"
                className="border rounded-md focus:outline-purple-700 pl-3 text-pink-500 "
                placeholder="Email"
            />
            <input
                ref={passwordRef}
                type="password"
                className="border rounded-md focus:outline-purple-700 pl-3 text-pink-500 "
                placeholder="Password"
            />
            <button className="py-2 px-5 bg-purple-500  hover:shadow-lg  hover:shadow-purple-500/50 hover:bg-purple-700 rounded-md text-white">
                Login
            </button>
            <p className="text-slate-500">
                Not Registered?{" "}
                <Link to="/signup" className="hover:text-purple-600">
                    Create an account
                </Link>
            </p>
        </form>
    );
};

export default Login;
