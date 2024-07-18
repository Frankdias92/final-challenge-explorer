/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'google.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'fonts.gstatic.com',
                pathname: '/s/**'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3333',
                pathname: '/files/**'
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/**'
            }
        ]
    },
};

export default nextConfig;
