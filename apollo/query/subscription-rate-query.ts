import { gql } from '@apollo/client';

export const GET_ALL_SUBSCRIPTION_RATES = `
query {
    getAllSubscriptionRates(queryString: {
        limit: null
    }) {
       results
       subscriptionRates {
           _id
           name 
           rate
           numMonths
           createdAt
           updatedAt
       }
    }
}
`;

export const GET_ALL_SUBSCRIPTION_RATES_BY_USER = gql`
    query GetAllSubscriptionRatesByUser(
        $queryString: QueryString
        $userId: ID
    ) {
        getAllSubscriptionRatesByUser(
            queryString: $queryString
            userId: $userId
        ) {
            results
            subscriptionRates {
                id
                _id
                name
                rate
                addedBy {
                    _id
                    name
                }
                numMonths
                createdAt
                updatedAt
            }
        }
    }
`;
