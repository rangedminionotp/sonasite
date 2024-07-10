const fs = require("fs");

// code by hollyluck
(async () => {
  const dir = await fs.promises.readdir("./src/assets/wallpapers");
  let importArray = [];
  let exportDefault = "export default {";
  for (const img of dir) {
    if (img.endsWith(".js") || img.endsWith(".ts")) continue;
    const imgFileName = img.split(".")[0];
    importArray.push(`import ${imgFileName} from "./${img}";`);
    exportDefault += `"${imgFileName}": ${imgFileName},\n`;
  }
  exportDefault = exportDefault.slice(0, exportDefault.length - 2);
  exportDefault += "};";

  await fs.promises.writeFile(
    "./src/assets/wallpapers/index.ts",
    `${importArray.join("\n")}\n${exportDefault}`
  );
})();
