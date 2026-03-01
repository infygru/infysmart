/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.infysmart.com' }],
                destination: 'https://infysmart.com/:path*',
                permanent: true,
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'api.infysmart.com', // Your Directus Server
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org', // Used for the Map placeholder in About page
            },
            {
                protocol: 'https',
                hostname: 'www.transparenttextures.com', // Used for background patterns
            },
        ],
    },
};

export default nextConfig;
