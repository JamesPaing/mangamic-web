import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = `
    query {
        getAllCategories(queryString: {
            limit: null
        }) {
            results
            categories {
                _id
                id
                name
                image
                slug
                bookCount
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_CATEGORY = gql`
    query GetCategory($_id: ID!) {
        getCategory(_id: $_id) {
            _id
            id
            name
            image
            slug
            bookCount
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_CATEGORY = gql`
    mutation CreateCategory($category: CategoryInput!) {
        createCategory(category: $category) {
            _id
            id
            name
            image
            slug
            bookCount
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($_id: ID!, $category: CategoryInput!) {
        updateCategory(_id: $_id, category: $category) {
            _id
            id
            name
            image
            slug
            bookCount
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_CATEGORY = gql`
    mutation DeleteCategory($_id: ID!) {
        deleteCategory(_id: $_id)
    }
`;
