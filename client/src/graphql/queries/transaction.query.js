import { gql } from "@apollo/client";
import { CORE_USER_FIELDS, CORE_TRANSACTION_FIELDS } from "../fragments";

export const GET_TRANSACTIONS = gql`
	${CORE_TRANSACTION_FIELDS}
	query GetTransactions {
		transactions {
			...CoreTransactionFields
		}
	}
`;

export const GET_TRANSACTION = gql`
	${CORE_TRANSACTION_FIELDS}
	${CORE_USER_FIELDS}
	query GetTransaction($transactionId: ID!) {
		transaction(transactionId: $transactionId) {
			...CoreTransactionFields
			user {
				...CoreUserFields
			}
		}
	}
`;

export const GET_TRANSACTION_STATISTICS = gql`
	query GetTransactionStatistics {
		categoryStatistics {
			category
			totalAmount
		}
	}
`;
