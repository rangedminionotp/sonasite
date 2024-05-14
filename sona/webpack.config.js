module.exports = {
  // Other webpack configurations...
  module: {
    rules: [
      // Other rules...
      {
        test: /\.(webm|mp4|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "videos/", // Specify the output directory for the videos
            },
          },
        ],
      },
    ],
  },
};
