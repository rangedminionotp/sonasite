export const parseTextWithComponents = (spellText) => {
  const regexReplacements = [
    {
      regex: /<mainText>(.*?)<\/mainText>/g,
      replacement: '<div class="text-md">$1</div>',
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
      replacement: '<span class="italic text-[#9d883b] font-bold">$1</span>',
    },
    {
      regex: /<active>(.*?)<\/active>/g,
      replacement: '<span class="italic text-[#9d883b] font-bold">$1</span>',
    },
    {
      regex: /<li>(.*?)<\/li>/g,
      replacement: "<ul><li>$1</li></ul>",
    },
    {
      regex: /<physicalDamage>(.*?)<\/physicalDamage>/g,
      replacement: '<span class= text-blue-400 font-semibold">$1</span>',
    },
    {
      regex: /<healing>(.*?)<\/healing>/g,
      replacement: '<span class= "text-green-500" font-semibold">$1</span>',
    },
    {
      regex: /<magicDamage>(.*?)<\/magicDamage>/g,
      replacement: '<span class="text-[#5E55C8] font-semibold">$1</span>',
    },
    {
      regex: /<speed>(.*?)<\/speed>/g,
      replacement: '<span class="text-[#C8C0B2] font-semibold">$1</span>',
    },
    {
      regex: /<scaleMR>(.*?)<\/scaleMR>/g,
      replacement: '<span class="text-[#5E55C8] font-semibold">$1</span>',
    },
    {
      regex: /<attention>(.*?)<\/attention>/g,
      replacement: '<span class="text-[#C8C0B2] font-semibold">$1</span>',
    },
    {
      regex: /<br><br>/g,
      replacement: "<br>",
    },
  ];

  let parsedText = spellText;

  regexReplacements.forEach(({ regex, replacement }) => {
    parsedText = parsedText.replace(regex, replacement);
  });

  return parsedText;
};
