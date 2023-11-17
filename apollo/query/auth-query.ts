import { gql } from '@apollo/client';

export const LOGIN = (credentials: any) => `
    mutation {
        login(credentials: {
            email: "${credentials.email}"
            password: "${credentials.password}"
        }) {
            token
            user {
                _id
                name
                email
                contact
                role
                isActive
            }
            isAuth
        }
    }
`;

export const REGISTER = (credentials: any) => `
    mutation {
        register(credentials: {
            name: "${credentials.name}"
            email: "${credentials.email}"
            contact: "${credentials.contact}"
            password: "${credentials.password}"
            passwordConfirmation: "${credentials.passwordConfirmation}"
        }) {
            token
            user {
                _id
                name
                email
                contact
                role
                isActive
            }
            isAuth
        }
    }
`;

export const REGISTER_NORMAL = gql`
    mutation Register($credentials: RegisterCredentials) {
        register(credentials: $credentials) {
            token
            user {
                _id
                name
                email
                contact
                role
                isActive
            }
            isAuth
        }
    }
`;
