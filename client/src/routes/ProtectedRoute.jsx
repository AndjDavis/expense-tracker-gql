import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthUserCache } from "../hooks/useCache";

const ProtectedRoute = () => {
	const location = useLocation();
	const { authUser } = useAuthUserCache();

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
