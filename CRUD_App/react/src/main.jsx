import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { ContextProvidor } from "./context/stateContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ContextProvidor>
            <RouterProvider router={router} />
        </ContextProvidor>
    </React.StrictMode>
);
