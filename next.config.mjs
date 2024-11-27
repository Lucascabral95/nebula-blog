/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'lh3.googleusercontent.com'
        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/blog',
                permanent: true,
                has: [
                    {
                        type: 'header',
                        key: 'x-redirection',
                        value: 'blog',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
