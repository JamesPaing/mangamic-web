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
