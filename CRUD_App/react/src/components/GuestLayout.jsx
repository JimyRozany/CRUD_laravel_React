import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/stateContext";

const GuestLayout = () => {
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <div className="container">
                <div className="form flex justify-center items-center h-screen">
                    <Outlet />
                </div>
            </div>
            {/* this for Guest only */}
        </>
    );
};

export default GuestLayout;
