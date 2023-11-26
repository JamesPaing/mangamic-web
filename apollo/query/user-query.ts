import { gql } from '@apollo/client';

export const GET_HISTORY = (_id: string) => `
query {
    getHistory(_id: "${_id}") {
        results
        books {
            _id
            title
            mainImage
            slug
        }
        chapters {
            _id 
            name 
            book {
                _id 
                title
            }
            slug
        }
    }
}
`;

export const GET_ALL_MODERATORS = `
    query {
        getAllModerators(queryString: {
            limit: null
        }) {
            results
            users {
                _id 
                name
                slug
            }
        }
    }
`;

export const GET_ALL_MODERATORS_NORMAL = gql`
    query GetAllModerators($queryString: QueryString) {
        getAllModerators(queryString: $queryString) {
            results
            users {
                _id
                name
                slug
            }
        }
    }
`;

export const GET_BOOKMARK = (_id: string) => `
query {
    getBookmark(_id: "${_id}") {
        results
        books {
            _id
            title
            mainImage
            slug
        }
    }
}
`;

export const GET_USER = (_id: string) => `
query {
    getUser(_id: "${_id}") {
        id
        _id
        name
        slug
        email
        contact
        subscriptions {
            _id
        }
        visitedBooks {
            _id
        }
        visitedChapters {
            _id
        }
        bookmarks {
            _id
        }
        role
        isActive
        createdAt
        updatedAt
    }
}
`;

export const ADD_TO_BOOKMARK = (_id: string, bookId: string) => `
mutation {
    addToBookmark(_id: "${_id}", bookId: "${bookId}") {
        status
    }
}
`;

export const REMOVER_FROM_BOOKMARK = (_id: string, bookId: string) => `
mutation {
    removeFromBookmark(_id: "${_id}", bookId: "${bookId}") {
        status
    }
}
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($_id: ID, $user: UserInput) {
        updateUser(_id: $_id, user: $user) {
            id
            _id
            name
            contact
            slug
            email
            role
            visitedBooks {
                _id
                title
            }
            visitedChapters {
                _id
                name
            }
            subscriptions {
                _id
            }
            isActive
            createdAt
            updatedAt
        }
    }
`;
