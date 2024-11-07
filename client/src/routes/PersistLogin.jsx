import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthUserCache } from "../hooks/useCache";

const PersistLogin = () => {
	const { authUser } = useAuthUserCache();

	let content = <Outlet />;
	if (authUser) {
		content = <Navigate to="/" />;
	}

	return content;
};

export default PersistLogin;
