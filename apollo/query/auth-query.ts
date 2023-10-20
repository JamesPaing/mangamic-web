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
            email: "admin@mail.com"
            password: "1234"
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
