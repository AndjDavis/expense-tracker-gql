import Card from "./Card";
import Spinner from "./Spinner";
import { useGetUserAndTransactions } from "../hooks/useGetUser";

const Cards = () => {
	const { authUser, transactions, loading } = useGetUserAndTransactions();

	let content = (
		<p className="text-2xl font-bold text-center w-full">
			No transaction history found.
		</p>
	);

	if (loading) {
		content = <Spinner />;
	} else if (Array.isArray(transactions) && transactions.length) {
		content = transactions.map((transaction) => (
			<Card
				authUser={authUser}
				key={transaction._id}
				transaction={transaction}
			/>
		));
	}

	return (
		<div className="w-full px-10 min-h-[40vh]">
			<p className="text-5xl font-bold text-center my-10">History</p>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
				{content}
			</div>
		</div>
	);
};

export default Cards;
