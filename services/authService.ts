import { LOGIN } from '@/apollo/query/auth-query';
import { getUri } from '@/utils/getApiUrl';

export const authenticate = async (email: string, password: string) => {
    const resp = await fetch(getUri(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: LOGIN({ email, password }) }),
    });

    const data = await resp.json();

    return data.data.login;
};
