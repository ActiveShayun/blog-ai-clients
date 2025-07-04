/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        pathname: '/**', // এটা যোগ করা জরুরি
      },
    ],
  },
};

export default nextConfig;
