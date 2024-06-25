/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',  // Permitir cualquier host
          },
          {
            protocol: 'http',
            hostname: '**',  // Permitir cualquier host
          },
        ],
      },
};

export default nextConfig;
