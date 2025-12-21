/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
