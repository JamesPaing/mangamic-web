export const GET_CHAPTER_BY_SLUG = (
    bookSlug: string,
    chapterSlug: string,
    userId: string
) => `
query {
    getChapterBySlug(bookSlug: "${bookSlug}", chapterSlug: "${chapterSlug}", userId: "${userId}") {
        id
        _id
        name
        book {
            _id 
            title
        }
        type
        images 
        slug
    }
}
`;
