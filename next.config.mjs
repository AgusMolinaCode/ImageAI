/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cloudinary-marketing-res.cloudinary.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;