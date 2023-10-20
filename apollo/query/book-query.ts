export const GET_ALL_BOOKS = `
    query {
        getAllBooks(queryString: {
            limit: "4"
            fields: "_id,title,mainImage,status,readCount, slug -addedBy -categories"
        }) {
            results
            books {
                id
                _id
                title
                summary
                slug
                mainImage
                addedBy {
                    _id
                    name
                }
                genres {
                    _id
                    name
                }
                categories {
                    _id
                    name
                }
                readCount
                chapters {
                    _id
                    name
                }
                status
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_BOOK = (_id: string) => `
query {
    getBook(_id: "${_id}") {
        id
        _id
        title
        mainImage
        summary
        addedBy {
            _id
            name
        }
        genres {
            _id
            name
        }
        categories {
            _id
            name
        }
        readCount
        chapters {
            _id
            name
        }
        status
        isActive
        createdAt
        updatedAt
    }
}
`;

export const GET_BOOK_BY_SLUG = (slug: string, userId: string) => `
query {
    getBookBySlug(slug: "${slug}", userId: "${userId}") {
        id
        _id
        title
        slug
        mainImage
        bookmarkedUsers {
            _id
            name
        }
        addedBy {
            _id
            name
        }
        genres {
            _id
            name
        }
        categories {
            _id
            name
        }
        readCount
        chapters {
            _id
            name
            slug
        }
        summary
        status
        isActive
        createdAt
        updatedAt
    }
}
`;

export const GET_ONLY_CHAPTERS = (_id: string) => `
query {
    getBook(_id: "${_id}") {
        _id
        chapters {
            _id
            name
            slug
        }
    }
}
`;
