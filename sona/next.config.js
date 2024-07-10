const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ddragon.leagueoflegends.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  // Other Next.js configuration options can be added here
};

module.exports = nextConfig;
