import Transaction from "../models/transaction.model.js";

const transactionResolver = {
	Query: {
		transaction: async (_, { transactionId }) => {
			try {
				const transaction = await Transaction.findById(transactionId)
					.lean()
					.exec();

				return transaction;
			} catch (error) {
				console.error("Error in transaction query", error);
				throw new Error("Error getting transaction");
			}
		},
		transactions: async (_, __, context) => {
			try {
				const user = await context.getUser();
				if (!user || !user?._id) {
					throw new Error("Unauthorized");
				}

				const transactions = await Transaction.find({
					userId: user._id,
				}).lean();

				return transactions;
			} catch (error) {
				console.error("Error in transactions query", error);
				throw new Error("Error getting transactions");
			}
		},
		categoryStatistics: async (_, __, context) => {
			try {
				const user = await context.getUser();
				if (!user || !user?._id) {
					throw new Error("Unauthorized");
				}

				const transactions = await Transaction.find({ userId: user._id })
					.lean()
					.exec();

				const categoryMap = transactions.reduce((acc, { category, amount }) => {
					acc[category] = (acc[category] || 0) + amount;
					return acc;
				}, {});

				return Object.entries(categoryMap).map(([category, totalAmount]) => ({
					category,
					totalAmount,
				}));
			} catch (error) {
				console.error("Error in categoryStatistics query", error);
				throw new Error("Error getting categoryStatistics");
			}
		},
	},
	Mutation: {
		createTransaction: async (_, { input }, context) => {
			try {
				const { _id: userId } = await context.getUser();
				const newTransaction = new Transaction({
					...input,
					userId,
				});
				await newTransaction.save();

				return newTransaction;
			} catch (error) {
				console.error("Error creating transaction:", error);
				throw new Error("Error creating transaction");
			}
		},
		updateTransaction: async (_, { input }) => {
			try {
				const updatedTransaction = await Transaction.findByIdAndUpdate(
					input.transactionId,
					input,
					{ new: true }
				)
					.lean()
					.exec();

				return updatedTransaction;
			} catch (error) {
				console.error("Error updating transaction:", error);
				throw new Error("Error updating transaction");
			}
		},
		deleteTransaction: async (_, { transactionId }) => {
			try {
				const deletedTransaction = await Transaction.findByIdAndDelete(
					transactionId
				);

				return deletedTransaction;
			} catch (error) {
				console.error("Error deleting transaction:", error);
				throw new Error("Error deleting transaction");
			}
		},
	},
};

export default transactionResolver;
