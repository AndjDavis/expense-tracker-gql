import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ authUser }) => {
	const location = useLocation();
	let content = <Outlet />;

	if (!authUser) {
		content = (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);
	}

	return content;
};

export default ProtectedRoute;
