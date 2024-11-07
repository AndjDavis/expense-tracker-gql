import { gql } from "@apollo/client";

export const CORE_USER_FIELDS = gql`
	fragment CoreUserFields on User {
		_id
		name
		username
	}
`;

export const CORE_TRANSACTION_FIELDS = gql`
	fragment CoreTransactionFields on Transaction {
		_id
		description
		paymentType
		category
		amount
		location
		date
	}
`;
