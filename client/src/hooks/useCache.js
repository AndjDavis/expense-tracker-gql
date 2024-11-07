import { useApolloClient, useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";

export const useAuthUserCache = () => {
	const { data, loading } = useQuery(GET_AUTHENTICATED_USER, {
		fetchPolicy: "cache-only",
	});
	return { authUser: data?.authUser || null, loading };
};
