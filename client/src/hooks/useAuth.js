import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";

const useAuth = () => {
	const { loading, data, error } = useQuery(GET_AUTHENTICATED_USER);
	const authUser = data?.authUser ? data.authUser : null;
	return { loading, authUser, error };
};

export { useAuth };
