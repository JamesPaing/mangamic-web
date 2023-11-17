const basePath = process.env.BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'images.dog.ceo'],
    },
    basePath,
    env: {
        basePath,
    },
};

module.exports = nextConfig;
