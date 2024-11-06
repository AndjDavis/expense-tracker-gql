import { useMutation } from "@apollo/client";
import { MdLogout } from "react-icons/md";

import DoughnutChart from "../components/ui/DoughnutChart";
import Cards from "../components/Cards";
import Spinner from "../components/Spinner";
import TransactionForm from "../components/TransactionForm";

import { LOGOUT } from "../graphql/mutations/user.mutation";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
	const { authUser } = useAuth();
	const [logout, { loading, client }] = useMutation(LOGOUT, {
		refetchQueries: ["GetAuthenticatedUser"],
	});

	const handleLogout = async () => {
		try {
			await logout();
			client.resetStore();
		} catch (error) {
			console.error("Error logging out:", error);
			toast.error(error.message);
		}
	};

	const logoutButton = loading ? (
		<Spinner />
	) : (
		<MdLogout
			className="mx-3 w-5 h-5 cursor-pointer"
			onClick={handleLogout}
		/>
	);

	const userProfileUrl = authUser?.profilePicture || "";

	return (
		<>
			<div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
				<div className="flex items-center gap-3">
					<p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
						Spend wisely, track wisely
					</p>
					<img
						src={userProfileUrl}
						className="w-11 h-11 rounded-full border cursor-pointer"
						alt="Avatar"
					/>
					{logoutButton}
				</div>
				<div className="flex flex-wrap w-full justify-center items-center gap-6">
					<DoughnutChart />
					<TransactionForm />
				</div>
				<Cards />
			</div>
		</>
	);
};

export default HomePage;
