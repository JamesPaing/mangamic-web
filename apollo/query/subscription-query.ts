import { gql } from '@apollo/client';

export const GET_ALL_SUBSCRIPTIONS = `
query {
    getAllSubscriptions(queryString: {
        limit: null
    }) {
        results
        subscriptions {
            id
            _id
            startedDate
            endedDate
            slip
            status
            subscriptionRate {
                _id
                name
            }
            paymentMethod {
                _id
                name
            }
            user {
                _id
                name
            }
            createdAt
            updatedAt
        }
    }
}
`;

export const CREATE_SUBSCRIPTION = gql`
    mutation CreateSubscription($subscription: SubscriptionInput!) {
        createSubscription(subscription: $subscription) {
            id
            _id
            startedDate
            endedDate
            slip
            status
            subscriptionRate {
                _id
                name
            }
            paymentMethod {
                _id
                name
            }
            user {
                _id
                name
            }
            createdAt
            updatedAt
        }
    }
`;
