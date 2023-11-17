import { gql } from '@apollo/client';

export const GET_ALL_SLIDERS = gql`
    query GetAllSliders($queryString: QueryString) {
        getAllSliders(queryString: $queryString) {
            results
            sliders {
                _id
                id
                title
                image
                body
                route
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_SLIDER = gql`
    query GetSlider($_id: ID!) {
        getSlider(_id: $_id) {
            _id
            id
            title
            image
            body
            route
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const CREATE_SLIDER = gql`
    mutation CreateSlider($slider: SliderInput!) {
        createSlider(slider: $slider) {
            _id
            id
            title
            image
            body
            route
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_SLIDER = gql`
    mutation UpdateSlider($_id: ID!, $slider: SliderInput!) {
        updateSlider(_id: $_id, slider: $slider) {
            _id
            id
            title
            image
            body
            route
            isActive
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_SLIDER = gql`
    mutation DeleteSlider($_id: ID!) {
        deleteSlider(_id: $_id)
    }
`;
