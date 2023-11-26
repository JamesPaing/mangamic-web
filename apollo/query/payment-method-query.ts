import { gql } from '@apollo/client';

export const GET_ALL_PAYMENT_METHODS = `
query {
    getAllPaymentMethods(queryString: {
        limit: null
    }) {
        results
        paymentMethods {
            _id 
            name 
            accountName 
            accountNumber
            image
        }
    }
}
`;

export const GET_ALL_PAYMENT_METHODS_BY_USER = gql`
    query GetAllPaymentMethodsByUser($queryString: QueryString, $userId: ID) {
        getAllPaymentMethodsByUser(queryString: $queryString, userId: $userId) {
            results
            paymentMethods {
                id
                _id
                name
                accountNumber
                accountName
                image
                addedBy {
                    _id
                    name
                }
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;
