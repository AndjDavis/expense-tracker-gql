import { GraphQLLocalStrategy } from "graphql-passport";
import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";

const configurePassport = async () => {
	passport.serializeUser((user, done) => {
		console.info("Serializing User");
		done(null, user.id);
	});
	passport.deserializeUser(async (id, done) => {
		console.info("Deserializing user");
		try {
			const user = await User.findById(id);
			done(null, user);
		} catch (error) {
			done(error);
		}
	});
	passport.use(
		new GraphQLLocalStrategy(async (username, password, done) => {
			try {
				const user = await User.findOne({ username });
				if (!user) {
					throw new Error("Invalid username or password");
				}

				// eslint-disable-next-line @typescript-eslint/await-thenable
				const validPassword = await bcrypt.compare(password, user.password);
				if (!validPassword) {
					throw new Error("Invalid username or password");
				}

				return done(null, user);
			} catch (error) {
				return done(error);
			}
		})
	);
};

export { configurePassport };
