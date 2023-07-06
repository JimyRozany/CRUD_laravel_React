import { Link } from "react-router-dom";

const Login = () => {
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <h3 className="text-center text-3xl text-purple-600">login</h3>
            <input
                type="email"
                className="border rounded-md focus:outline-purple-700 pl-3 text-pink-500 "
                placeholder="Email"
            />
            <input
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
