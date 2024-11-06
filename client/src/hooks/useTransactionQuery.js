import { useQuery } from "@apollo/client";
import {
	GET_TRANSACTION,
	GET_TRANSACTIONS,
	GET_TRANSACTION_STATISTICS,
} from "../graphql/queries/transaction.query";

export const useGetTransaction = (transactionId) => {
	const { data, ...queryProps } = useQuery(GET_TRANSACTION, {
		variables: { transactionId },
	});
	const transaction = data?.transaction || null;
	return { transaction, ...queryProps };
};

export const useGetTransactions = () => {
	const { data, ...queryProps } = useQuery(GET_TRANSACTIONS);
	const transactions = data?.transactions || null;
	return { transactions, ...queryProps };
};

export const useGetTransactionStatistics = () => {
	const { data, ...queryProps } = useQuery(GET_TRANSACTION_STATISTICS);
	const categoryStatistics = data?.categoryStatistics || null;
	return { categoryStatistics, ...queryProps };
};
