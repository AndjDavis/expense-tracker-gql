import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

const PersistLogin = ({ authUser }) => {
    let content = <Outlet />
    if (authUser) {
        content = (
            <Navigate to="/" />
        )
    }

    return content;
}

export default PersistLogin;
