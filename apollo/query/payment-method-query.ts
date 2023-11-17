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
