import { LOGIN } from '@/apollo/query/auth-query';

export const authenticate = async (email: string, password: string) => {
    const resp = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: LOGIN({ email, password }) }),
    });

    const data = await resp.json();

    console.log(data);

    return data.data.login;
};
