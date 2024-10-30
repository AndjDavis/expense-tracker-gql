import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";

// import { GET_AUTHENTICATED_USER } from "./graphql/queries/user.query";

function App() {
	const authUser = true;
	return (
		<>
			{authUser && <Header />}
			<Routes>
				<Route
					path="/"
					element={<HomePage />}
				/>
				<Route
					path="/login"
					element={<LoginPage />}
				/>
				<Route
					path="/signup"
					element={<SignUpPage />}
				/>
				<Route
					path="/transaction/:id"
					element={<TransactionPage />}
				/>
				<Route
					path="*"
					element={<NotFoundPage />}
				/>
			</Routes>
		</>
	);
}

// function App() {
// 	const { loading, data } = useQuery(GET_AUTHENTICATED_USER);

// 	if (loading) return null;

// 	return (
// 		<>
// 			{data?.authUser && <Header />}
// 			<Routes>
// 				<Route
// 					path="/"
// 					element={data.authUser ? <HomePage /> : <Navigate to="/login" />}
// 				/>
// 				<Route
// 					path="/login"
// 					element={!data.authUser ? <LoginPage /> : <Navigate to="/" />}
// 				/>
// 				<Route
// 					path="/signup"
// 					element={!data.authUser ? <SignUpPage /> : <Navigate to="/" />}
// 				/>
// 				<Route
// 					path="/transaction/:id"
// 					element={
// 						data.authUser ? <TransactionPage /> : <Navigate to="/login" />
// 					}
// 				/>
// 				<Route
// 					path="*"
// 					element={<NotFoundPage />}
// 				/>
// 			</Routes>
// 			<Toaster />
// 		</>
// 	);
// }

export default App;
