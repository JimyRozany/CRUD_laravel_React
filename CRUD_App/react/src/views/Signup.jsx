import { useRef } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/stateContext";
import axiosClient from "../axios-client";

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmationPasswordRef = useRef();

    const { setUser, setToken } = useStateContext();
    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmation_password: confirmationPasswordRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
            });
    };
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <h3 className="text-center text-3xl text-purple-600">Register</h3>
            <input
                ref={nameRef}
                type="text"
                className="border rounded-md focus:outline-purple-700 pl-3 text-pink-500 "
                placeholder="Full Name"
            />
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
            <input
                ref={confirmationPasswordRef}
                type="password"
                className="border rounded-md focus:outline-purple-700 pl-3 text-pink-500 "
                placeholder="Confirmation Password"
            />
            <button className="py-2 px-5 bg-purple-500  hover:shadow-lg  hover:shadow-purple-500/50 hover:bg-purple-700 rounded-md text-white">
                Signup
            </button>
            <p className="text-slate-500">
                Already Registered?{" "}
                <Link to="/login" className="hover:text-purple-600">
                    Signin
                </Link>
            </p>
        </form>
    );
};

export default Signup;
