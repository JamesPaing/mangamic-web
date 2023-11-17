const basePath = process.env.BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost',
            'images.dog.ceo',
            'api.mangamic.cc',
            'mangamic-api.alliance-solutions.tech',
        ],
    },
    basePath,
    env: {
        basePath,
    },
};

module.exports = nextConfig;
