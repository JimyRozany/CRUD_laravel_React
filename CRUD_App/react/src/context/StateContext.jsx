import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null, // user info
    token: null, //user token
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvidor = ({ children }) => {
    const [user, setUser] = useState({
        name: "mohamed",
    });
    // const [token, _setToken] = useState(1234);
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
