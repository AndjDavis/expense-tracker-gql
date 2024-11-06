import { useMutation } from "@apollo/client";
import {
	CREATE_TRANSACTION,
	UPDATE_TRANSACTION,
	DELETE_TRANSACTION,
} from "../graphql/mutations/transaction.mutation";
import { GET_USER_AND_TRANSACTIONS } from "../graphql/queries/user.query";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";

export const useCreateTransaction = () => {
	const [createTransaction, { ...mutationProps }] = useMutation(
		CREATE_TRANSACTION,
		{
			refetchQueries: [GET_USER_AND_TRANSACTIONS, GET_TRANSACTION_STATISTICS],
		}
	);

	return { createTransaction, ...mutationProps };
};

export const useUpdateTransaction = () => {
	const [updateTransaction, { ...mutationProps }] = useMutation(
		UPDATE_TRANSACTION,
		{
			refetchQueries: [GET_TRANSACTION_STATISTICS],
		}
	);

	return { updateTransaction, ...mutationProps };
};

export const useDeleteTransaction = () => {
	const [deleteTransaction, { ...mutationProps }] = useMutation(
		DELETE_TRANSACTION,
		{
			refetchQueries: [GET_USER_AND_TRANSACTIONS, GET_TRANSACTION_STATISTICS],
		}
	);

	return { deleteTransaction, ...mutationProps };
};
