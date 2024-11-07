import { gql } from "@apollo/client";
import { CORE_USER_FIELDS, CORE_TRANSACTION_FIELDS } from "../fragments";

export const GET_AUTHENTICATED_USER = gql`
	${CORE_USER_FIELDS}
	query GetAuthenticatedUser {
		authUser {
			...CoreUserFields
			profilePicture
		}
	}
`;

export const GET_USER_AND_TRANSACTIONS = gql`
	${CORE_USER_FIELDS}
	${CORE_TRANSACTION_FIELDS}
	query GetUserAndTransactions {
		authUser {
			...CoreUserFields
			profilePicture
			# relationships
			transactions {
				...CoreTransactionFields
			}
		}
	}
`;
