/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["localhost", "i.ibb.co", "res.cloudinary.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;
