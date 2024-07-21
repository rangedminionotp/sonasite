// const regexReplacements = [
//   {
//     regex: /<mainText>(.*?)<\/mainText>/g,
//     replacement: { text: "$1", style: "text-lg font-bold" },
//   },
//   {
//     regex: /<stats>(.*?)<\/stats>/g,
//     replacement: { text: "$1", style: "flex flex-col space-y-2" },
//   },
//   {
//     regex: /<attention>(.*?)<\/attention>/g,
//     replacement: { text: "$1", style: "text-red-500 font-bold" },
//   },
//   {
//     regex: /<passive>(.*?)<\/passive>/g,
//     replacement: { text: "$1", style: "italic" },
//   },
//   {
//     regex: /<li>(.*?)<\/li>/g,
//     replacement: { text: "$1", style: "list-disc pl-5" },
//   },
//   {
//     regex: /<physicalDamage>(.*?)<\/physicalDamage>/g,
//     replacement: { text: "$1", style: "text-blue-400 font-bold" },
//   },
//   {
//     regex: /<healing>(.*?)<\/healing>/g,
//     replacement: { text: "$1", style: "text-green-500 font-bold" },
//   },
// ];

// export const parseTextWithComponents = (inputText) => {
//   let parsedData = [];

//   regexReplacements.forEach(({ regex, replacement }) => {
//     const matches = [...inputText.matchAll(regex)].map((match) => ({
//       text: match[1],
//       style: replacement.style,
//     }));
//     console.log("matches", matches);
//     parsedData.push(matches);
//   });
//   console.log("parsedData", parsedData.text);
//   // Flatten the array and join the text segments
//   const flattenedData = parsedData
//     .flat()
//     .map((data) => data.text)
//     .join(" ");

//   return flattenedData;
// };
export const parseTextWithComponents = (spellText) => {
  const regexReplacements = [
    {
      regex: /<mainText>(.*?)<\/mainText>/g,
      replacement: '<div class="text-lg font-bold">$1</div>',
    },
    {
      regex: /<stats>(.*?)<\/stats>/g,
      replacement: '<div class="font-semibold gap-2 space-y-2">$1</div>',
    },
    {
      regex: /<attention>(.*?)<\/attention>/g,
      replacement: '<span class="text-gray-200 font-bold">$1</span>',
    },
    {
      regex: /<passive>(.*?)<\/passive>/g,
      replacement: '<span class="italic">$1</span>',
    },
    {
      regex: /<li>(.*?)<\/li>/g,
      replacement: "<ul><li>$1</li></ul>",
    },
    {
      regex: /<physicalDamage>(.*?)<\/physicalDamage>/g,
      replacement: '<span class="text-blue-400 font-bold">$1</span>',
    },
    {
      regex: /<healing>(.*?)<\/healing>/g,
      replacement: '<span class="text-green-500 font-bold">$1</span>',
    },
    // {
    //   regex: /<br>/g,
    //   replacement: "<div></div>",
    // },
  ];

  let parsedText = spellText;

  regexReplacements.forEach(({ regex, replacement }) => {
    parsedText = parsedText.replace(regex, replacement);
  });

  return parsedText;
};
