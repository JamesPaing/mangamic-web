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
