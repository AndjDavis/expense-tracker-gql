import { useQuery } from "@apollo/client";
import {
	GET_TRANSACTION,
	GET_TRANSACTIONS,
    GET_TRANSACTION_STATISTICS,
} from "../graphql/queries/transaction.query";

export const useGetTransactions = () => {
	const { data, loading, error } = useQuery(GET_TRANSACTIONS);
	const transactions = data?.transactions || null;
	return { transactions, loading, error };
};

export const useGetTransaction = (transactionId) => {
	const { data, loading, error } = useQuery(GET_TRANSACTION, {
        variables: { transactionId }
    });
    const transaction = data?.transaction || null;
    return { transaction, loading, error };
};

export const useGetTransactionStatistics = () => {
    const { data, loading, error } = useQuery(GET_TRANSACTION_STATISTICS);
    const categoryStatistics = data?.categoryStatistics || null;
    return { categoryStatistics, loading, error };
}