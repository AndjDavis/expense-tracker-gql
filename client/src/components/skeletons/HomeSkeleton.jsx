import CardsSkeleton from "./CardsSkeleton";

const HomeSkeleton = () => {
	return (
		<>
			<div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
				<div className="flex items-center">
					<p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
						Spend wisely, track wisely
					</p>
					<img
						src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
						className="w-11 h-11 rounded-full border cursor-pointer"
						alt="Avatar"
					/>
				</div>

				<CardsSkeleton />
			</div>
		</>
	);
};

export default HomeSkeleton;
