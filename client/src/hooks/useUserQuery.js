import { useQuery } from "@apollo/client";
import {
	GET_AUTHENTICATED_USER,
	GET_USER_AND_TRANSACTIONS,
} from "../graphql/queries/user.query";

export const useGetAuthenticatedUser = () => {
	const { data, ...queryProps } = useQuery(GET_AUTHENTICATED_USER);
	const authUser = data?.authUser || null;
	return { authUser, ...queryProps };
};

export const useGetUserAndTransactions = () => {
	const { data, ...queryProps } = useQuery(GET_USER_AND_TRANSACTIONS);
	const authUser = data?.authUser || null;
	const transactions = authUser?.transactions || null;
	return { authUser, transactions, ...queryProps };
};
