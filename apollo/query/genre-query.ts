import { gql } from '@apollo/client';

export const GET_ALL_GENRES = `
    query {
        getAllGenres(queryString: {
            limit: null
        }) {
            results
            genres {
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

export const GET_ALL_GENRES_NORMAL = gql`
    query GetAllGenres($queryString: QueryString) {
        getAllGenres(queryString: $queryString) {
            results
            genres {
                _id
                id
                name
                image
                bookCount
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_GENRE = gql`
    query GetGenre($_id: ID!) {
        getGenre(_id: $_id) {
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

export const CREATE_GENRE = gql`
    mutation CreateGenre($genre: GenreInput!) {
        createGenre(genre: $genre) {
            _id
            id
            name
            image
            bookCount
            slug
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_GENRE = gql`
    mutation UpdateGenre($_id: ID!, $genre: GenreInput!) {
        updateGenre(_id: $_id, genre: $genre) {
            _id
            id
            name
            image
            bookCount
            slug
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_GENRE = gql`
    mutation DeleteGenre($_id: ID!) {
        deleteGenre(_id: $_id)
    }
`;
