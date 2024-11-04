import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

import SubmitButton from "../components/SubmitButton";
import InputField from "../components/InputField";
import { LOGIN } from "../graphql/mutations/user.mutation";

const initialState = {
	username: "dbow",
	password: "testtest",
};

const LoginPage = () => {
	const [login, { loading }] = useMutation(LOGIN, {
		refetchQueries: ["GetAuthenticatedUser"],
	});
	const [loginData, setLoginData] = useState(initialState);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoginData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!loginData.username || !loginData.password) {
			return toast.error("Please fill in all fields");
		}

		try {
			await login({
				variables: {
					input: loginData,
				},
			});
		} catch (error) {
			console.error("Login error: ", error);
			toast.error(error.message);
		}
	};

	const submitIsDisabled = !(loginData?.password && loginData?.username);

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="flex rounded-lg overflow-hidden z-50 bg-gray-300">
				<div className="w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center">
					<div className="max-w-md w-full p-6">
						<h1 className="text-3xl font-semibold mb-6 text-black text-center">
							Login
						</h1>
						<h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
							Welcome back! Log in to your account
						</h1>
						<form
							className="space-y-4"
							onSubmit={handleSubmit}
						>
							<InputField
								label="Username"
								id="username"
								name="username"
								value={loginData.username}
								onChange={handleChange}
							/>

							<InputField
								label="Password"
								id="password"
								name="password"
								type="password"
								value={loginData.password}
								onChange={handleChange}
							/>
							<div>
								<SubmitButton
									text="Login"
									loading={loading}
									disabled={submitIsDisabled}
								/>
							</div>
						</form>
						<div className="mt-4 text-sm text-gray-600 text-center">
							<p>
								{"Don't"} have an account?{" "}
								<Link
									to="/signup"
									className="text-black hover:underline"
								>
									Sign Up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
