import { useMutation } from "@apollo/client";
import { SIGN_UP, LOGIN, LOGOUT } from "../graphql/mutations/user.mutation";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";

export const useLogin = () => {
	const [login, { ...mutationProps }] = useMutation(LOGIN, {
		refetchQueries: [GET_AUTHENTICATED_USER],
	});
	return { login, ...mutationProps };
};

export const useLogout = () => {
	const [logout, { ...mutationProps }] = useMutation(LOGOUT, {
		refetchQueries: [GET_AUTHENTICATED_USER],
	});
	return { logout, ...mutationProps };
};

export const useSignUp = () => {
	const [signup, { ...mutationProps }] = useMutation(SIGN_UP, {
		refetchQueries: [GET_AUTHENTICATED_USER],
	});
	return { signup, ...mutationProps };
};
