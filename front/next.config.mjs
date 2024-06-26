/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [{
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "revston.b-cdn.net",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "acdn.mitiendanube.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "ark8.net",
                port: "",
                pathname: "/**",
            }
        ],
    }
};

export default nextConfig;