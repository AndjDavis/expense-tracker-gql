import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TransactionPage from "./pages/TransactionPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";
import HomeSkeleton from "./components/skeletons/HomeSkeleton";
import ProtectedRoute from "./routes/ProtectedRoute";
import PersistLogin from "./routes/PersistLogin";

import { useGetAuthenticatedUser } from "./hooks/useUserQuery";

function App() {
	const { authUser, loading } = useGetAuthenticatedUser();
	if (loading) {
		return <HomeSkeleton />;
	}

	return (
		<>
			{authUser && <Header />}
			<Routes>
				<Route element={<PersistLogin authUser={authUser} />}>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route
						path="/signup"
						element={<SignUpPage />}
					/>
				</Route>
				<Route element={<ProtectedRoute authUser={authUser} />}>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/transaction/:id"
						element={<TransactionPage />}
					/>
				</Route>
				<Route
					path="*"
					element={<NotFoundPage />}
				/>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
