import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";

const userResolver = {
	Query: {
		authUser: async (_, __, context) => {
			try {
				const user = await context.getUser();
				return user;
			} catch (error) {
				console.error("Error in authUser: ", error);
				throw new Error(error.message || "Internal server error");
			}
		},
		users: async (_, __, context) => {
			try {
				const users = await User.find().select("-password").lean();
				return users;
			} catch (error) {
				console.error("Error in users query: ", error);
				throw new Error(error.message || "Internal server error");
			}
		},
		user: async (_, { userId }) => {
			try {
				const user = await User.findById(userId).lean().exec();
				return user;
			} catch (error) {
				console.error("Error in user query: ", error);
				throw new Error(error.message || "Internal server error");
			}
		},
	},
	Mutation: {
		signUp: async (_, { input }, context) => {
			try {
				const { username, name, password, gender } = input;
				if (!username || !name || !password || !gender) {
					throw new Error("All fields are required");
				}

				const duplicate = await User.findOne({ username })
					.collation({ locale: "en", strength: 2 })
					.lean()
					.exec();

				if (duplicate) {
					throw new Error("User already exists");
				}

				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);

				// https://avatar-placeholder.iran.liara.run/
				const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
				const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
				const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

				const newUser = new User({
					username,
					name,
					password: hashedPassword,
					gender,
					profilePicture: profilePic,
				});

				await newUser.save();
				await context.login(newUser);
				return newUser;
			} catch (error) {
				console.error("Error in signUp: ", error);
				throw new Error(error.message || "Internal server error");
			}
		},
		login: async (_, { input }, context) => {
			try {
				const { username, password } = input;
				if (!username || !password) {
					throw new Error("All fields are required");
				}

				const { user } = await context.authenticate("graphql-local", {
					username,
					password,
				});
				await context.login(user);
				return user;
			} catch (error) {
				console.error("Error in login:", error);
				throw new Error(error.message || "Internal server error");
			}
		},
		logout: async (_, __, context) => {
			try {
				await context.logout();
				context.req.session.destroy((err) => {
					if (err) throw err;
				});
				context.res.clearCookie("connect.sid");

				return { message: "Logged out successfully" };
			} catch (error) {
				console.error("Error in logout:", error);
				throw new Error(error.message || "Internal server error");
			}
		},
	},
	User: {
		transactions: async (parent) => {
			try {
				const transactions = await Transaction.find({ userId: parent._id });
				return transactions;
			} catch (error) {
				console.log("Error in user.transactions resolver: ", error);
				throw new Error(error.message || "Internal server error");
			}
		},
	},
};

export default userResolver;
