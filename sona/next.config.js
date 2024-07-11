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
      {
        protocol: "https",
        hostname: "ddragon.canisback.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.communitydragon.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mobafire.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  // Other Next.js configuration options can be added here
};

module.exports = nextConfig;
