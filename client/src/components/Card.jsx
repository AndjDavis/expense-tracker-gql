import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";

import Spinner from "./Spinner";
import { useDeleteTransaction } from "../hooks/useTransactionMutation";
import { formatDate } from "../utils/format";

const categoryColorMap = {
	saving: "from-green-700 to-green-400",
	expense: "from-pink-800 to-pink-600",
	investment: "from-blue-700 to-blue-400",
	// Add more categories and corresponding color classes as needed
};

const Card = ({ transaction, authUser }) => {
	const { deleteTransaction, loading } = useDeleteTransaction();

	const {
		amount,
		category,
		date,
		description,
		location,
		paymentType,
		_id: transactionId,
	} = transaction;

	const cardClass = categoryColorMap[category];
	const formattedDate = formatDate(date);
	const profilePicture = authUser?.profilePicture || "";

	const handleDelete = async () => {
		try {
			await deleteTransaction({
				variables: { transactionId: transactionId },
			});
			toast.success("Transaction deleted successfully");
		} catch (error) {
			console.error("Error deleting transaction:", error);
			toast.error(error.message);
		}
	};

	let cardIcons = (
		<div className="flex items-center gap-2">
			<Spinner />
		</div>
	);

	if (!loading && transactionId) {
		cardIcons = (
			<div className="flex items-center gap-2">
				<FaTrash
					className={"cursor-pointer"}
					onClick={handleDelete}
				/>
				<Link to={`/transaction/${transactionId}`}>
					<HiPencilAlt
						className="cursor-pointer"
						size={20}
					/>
				</Link>
			</div>
		);
	}

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className="flex flex-col gap-3">
				<div className="flex flex-row items-center justify-between">
					<h2 className="text-lg font-bold text-white capitalize">
						{category}
					</h2>
					{cardIcons}
				</div>
				<p className="text-white flex items-center gap-1 capitalize">
					<BsCardText />
					Description: {description}
				</p>
				<p className="text-white flex items-center gap-1 capitalize">
					<MdOutlinePayments />
					Payment Type: {paymentType}
				</p>
				<p className="text-white flex items-center gap-1">
					<FaSackDollar />
					Amount: ${amount}
				</p>
				<p className="text-white flex items-center gap-1 capitalize">
					<FaLocationDot />
					Location: {location || "N/A"}
				</p>
				<div className="flex justify-between items-center">
					<p className="text-xs text-black font-bold">{formattedDate}</p>
					<img
						src={profilePicture}
						className="h-8 w-8 border rounded-full"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default Card;
