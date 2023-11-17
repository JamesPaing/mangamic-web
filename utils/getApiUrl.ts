export const getUri = () => {
    return (
        (process.env.NODE_ENV === 'production'
            ? process.env.PROD_API_URL
            : process.env.DEV_API_URL) ?? 'http://localhost:3000/graphql'
    );
};

export const getWsUrl = () => {
    return (
        (process.env.NODE_ENV === 'production'
            ? process.env.PROD_WS_URL
            : process.env.DEV_WS_URL) ?? 'ws://localhost:3000/graphql'
    );
};
