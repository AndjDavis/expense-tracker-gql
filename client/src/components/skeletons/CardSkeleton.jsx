import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import Spinner from "../Spinner";

const CardSkeleton = () => {
	return (
		<div
			className={`rounded-md p-4 bg-gradient-to-br from-gray-700 to-gray-300`}
		>
			<div className="flex flex-col gap-3">
				<div className="flex flex-row items-center justify-between">
					<h2 className="text-lg font-bold text-white">Saving</h2>
					<div className="flex items-center gap-2">
						<Spinner />
					</div>
				</div>
				<p className="text-white flex items-center gap-1">
					<BsCardText />
					Description: Salary
				</p>
				<p className="text-white flex items-center gap-1">
					<MdOutlinePayments />
					Payment Type: Cash
				</p>
				<p className="text-white flex items-center gap-1">
					<FaSackDollar />
					Amount: $150
				</p>
				<p className="text-white flex items-center gap-1">
					<FaLocationDot />
					Location: New York
				</p>
				<div className="flex justify-between items-center">
					<p className="text-xs text-black font-bold">21 Sep, 2001</p>
					<Spinner />
					{/* <img
						src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
						className="h-8 w-8 border rounded-full"
						alt=""
					/> */}
				</div>
			</div>
		</div>
	);
};

export default CardSkeleton;
