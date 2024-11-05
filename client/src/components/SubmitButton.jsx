import Spinner from "./Spinner";

const SubmitButton = ({ text, loading, disabled = false }) => {
	let content = (
		<button
			type="submit"
			disabled={disabled}
			className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{text}
		</button>
	);

	if (loading) content = <Spinner />;
	return content;
};

export default SubmitButton;
