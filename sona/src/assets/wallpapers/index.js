const images = {};

function importAll(r) {
  r.keys().forEach((key) => (images["/" + key.replace("./", "")] = r(key))); // Add leading slash
}

importAll(require.context("./", false, /\.(png|jpe?g|svg|webp)$/));

export default images;
