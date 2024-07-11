const fs = require("fs");

// code by hollyluck
(async () => {
  const dir = await fs.promises.readdir(".");
  let importArray = [];
  let exportDefault = " const res = {";
  for (const img of dir) {
    if (img.endsWith(".js") || img.endsWith(".ts")) continue;
    const imgFileName = img.split(".")[0];
    importArray.push(`import ${imgFileName} from "./${img}";`);
    exportDefault += `"${imgFileName}": ${imgFileName},\n`;
  }
  exportDefault = exportDefault.slice(0, exportDefault.length - 2);
  exportDefault += "}; export default res;";

  await fs.promises.writeFile(
    "index.ts",
    `${importArray.join("\n")}\n${exportDefault}`
  );
})();
