import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import RadioButton from "../components/RadioButton";
import InputField from "../components/InputField";
import SubmitButton from "../components/SubmitButton";
import { SIGN_UP } from "../graphql/mutations/user.mutation";

const MALE = "male";
const FEMALE = "female";

const initialState = {
	name: "",
	username: "",
	password: "",
	gender: "",
};

const SignUpPage = () => {
	const [signup, { loading }] = useMutation(SIGN_UP, {
		refetchQueries: ["GetAuthenticatedUser"],
	});
	const [signUpData, setSignUpData] = useState(initialState);
	const { username, name, password, gender } = signUpData;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setSignUpData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!username || !name || !password || !gender) {
			return toast.error("Please fill in all fields");
		}

		try {
			await signup({
				variables: {
					input: signUpData,
				},
			});
		} catch (error) {
			console.error("Sign up error: ", error);
			toast.error(error.message);
		}
	};

	const isMale = gender === MALE;
	const isFemale = gender === FEMALE;
	const radioSelectionRequired = !(isMale || isFemale);
	const submitIsDisabled = !(username && name && password && gender);

	return (
		<div className="h-screen flex justify-center items-center">
			<div className="flex rounded-lg overflow-hidden z-50 bg-gray-300">
				<div className="w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center">
					<div className="max-w-md w-full p-6">
						<h1 className="text-3xl font-semibold mb-6 text-black text-center">
							Sign Up
						</h1>
						<h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
							Join to keep track of your expenses
						</h1>
						<form
							className="space-y-4"
							onSubmit={handleSubmit}
						>
							<InputField
								label="Full Name"
								id="name"
								name="name"
								value={signUpData.name}
								onChange={handleChange}
							/>
							<InputField
								label="Username"
								id="username"
								name="username"
								value={signUpData.username}
								onChange={handleChange}
							/>

							<InputField
								label="Password"
								id="password"
								name="password"
								type="password"
								value={signUpData.password}
								onChange={handleChange}
							/>
							<div className="flex gap-10">
								<RadioButton
									id="male"
									label="Male"
									name="gender"
									value="male"
									onChange={handleChange}
									checked={isMale}
									required={radioSelectionRequired}
								/>
								<RadioButton
									id="female"
									label="Female"
									name="gender"
									value="female"
									onChange={handleChange}
									checked={isFemale}
									required={radioSelectionRequired}
								/>
							</div>

							<div>
								<SubmitButton
									text="Sign Up"
									loading={loading}
									disabled={submitIsDisabled}
								/>
							</div>
						</form>

						<div className="mt-4 text-sm text-gray-600 text-center">
							<p>
								Already have an account?{" "}
								<Link
									to="/login"
									className="text-black hover:underline"
								>
									Login here
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
