import { gql } from '@apollo/client';

export const GET_ALL_BOOKS_NORMAL = gql`
    query GetAllBooks($queryString: QueryString) {
        getAllBooks(queryString: $queryString) {
            results
            pagination
            books {
                id
                _id
                title
                summary
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
                slug
                status
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_ALL_BOOKS = `
    query {
        getAllBooks(queryString: {
            limit: "9"
            fields: "_id,title,mainImage,status,readCount, slug -addedBy -categories"
        }) {
            results
            pagination
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

export const GET_NEW_CHAPTER_BOOKS = `
    query {
        getNewChapterBooks(queryString: {
            limit: null
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

export const SEARCH_BOOKS = (keyword: string) => `
    query {
        getAllBooks(queryString: {
            limit: null
            search: "${keyword}"
            searchField: "title"
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

export const GET_ALL_BOOKS_BY_CATEGORY = (categoryId: string) => `
    query {
        getAllBooksByCategory(queryString: {
            limit: "9"
            fields: "_id,title,mainImage,status,readCount, slug -addedBy -categories"
        }, categoryId: "${categoryId}") {
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

export const GET_ALL_BOOKS_BY_CATEGORY_SLUG = (categorySlug: string) => `
    query {
        getAllBooksByCategorySlug(queryString: {
            limit: "9"
            fields: "_id,title,mainImage,status,readCount, slug -addedBy -categories"
        }, categorySlug: "${categorySlug}") {
            results
            pagination
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

export const GET_ALL_BOOKS_BY_CATEGORY_SLUG_NORMAL = gql`
    query GetAllBooksByCategorySlug(
        $queryString: QueryString
        $categorySlug: String
    ) {
        getAllBooksByCategorySlug(
            queryString: $queryString
            categorySlug: $categorySlug
        ) {
            results
            pagination
            books {
                id
                _id
                title
                summary
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
                slug
                status
                isActive
                createdAt
                updatedAt
            }
        }
    }
`;

export const GET_TRENDING_BOOKS = `
    query {
        getAllBooks(queryString: {
            limit: "9"
            fields: "_id,title,mainImage,status,readCount, slug -addedBy -categories"
            sort: "-bookCount"
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
            type
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
