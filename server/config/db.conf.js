import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const MONGODB_URI = process.env.MONGODB_URI;
		const { connection } = await mongoose.connect(MONGODB_URI);
		console.info(
			`Mongoose | MongoDB connection successful: ${connection.host}`
		);
	} catch (error) {
		console.error("Mongoose | MongoDB connection error:", error);
        process.exit(1);
	}
};

export { connectDB };
