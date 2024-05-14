import React from "react";
import AbilitiesContext from "../SharedContext";
import magicDamage from "./MagicDamage";
import Q from "../../../../assets/abilities/Hymn_of_Valor.webp";
import W from "../../../../assets/abilities/Aria_of_Perseverance.webp";
import E from "../../../../assets/abilities/Song_of_Celerity.webp";
import R from "../../../../assets/abilities/Crescendo.webp";
import passive from "../../../../assets/abilities/Power_Chord.webp";
import Image from "next/image";
import AbilitiesNavbar from "./AbilitiesNavbar";

// ty chatgpt :3
const parseSpellText = (spellText) => {
  const regexReplacements = [
    {
      regex: /<magicDamage>(.*?)<\/magicDamage>/g,
      replacement: '<span class="text-blue-500 font-bold">$1</span>',
    },
    {
      regex: /<keywordMajor>(.*?)<\/keywordMajor>/g,
      replacement: '<span class="text-yellow-500 font-bold">$1</span>',
    },
    {
      regex: /<spellPassive>(.*?)<\/spellPassive>/g,
      replacement: '<span class="font-bold text-gray-500">$1</span>',
    },
    {
      regex: /<healing>(.*?)<\/healing>/g,
      replacement: '<span class="text-green-500 font-bold">$1</span>',
    },
    {
      regex: /<shield>(.*?)<\/shield>/g,
      replacement: '<span class="text-green-600 font-bold">$1</span>',
    },
    {
      regex: /<speed>(.*?)<\/speed>/g,
      replacement: '<span class="text-purple-600 font-bold">$1</span>',
    },
    {
      regex: /<status>(.*?)<\/status>/g,
      replacement: '<span class="text-blue-800 font-bold italic">$1</span>',
    },
  ];

  let parsedText = spellText;

  regexReplacements.forEach(({ regex, replacement }) => {
    parsedText = parsedText.replace(regex, replacement);
  });

  return parsedText;
};

const resolveSpellText = (spellText, variables) => {
  // Replace placeholders with actual values
  for (const [key, value] of Object.entries(variables)) {
    spellText = spellText.replace(new RegExp(`{{\\s*${key}\\s*}}`, "g"), value);
  }
  return spellText;
};

const AbilityDescription = () => {
  const abilities = [Q, W, E, R, passive];
  const {
    abilityVisibility,
    setAbilityVisibility,
    fetchedData,
    fetchedRawDataQ,
    fetchedRawDataW,
    fetchedRawDataE,
    fetchedRawDataR,
    breadcrumbs,
    setBreadcrumbs,
  } = React.useContext(AbilitiesContext);
  const rawData = [
    fetchedRawDataQ,
    fetchedRawDataW,
    fetchedRawDataE,
    fetchedRawDataR,
  ];
  return (
    <div name="Overview">
      {fetchedData &&
        fetchedData.abilities.map((ability, index) => (
          <div
            // key={`${ability}-overview`}
            className={
              !abilityVisibility[index].active
                ? "hidden"
                : "top-0 left-0 w-full h-screen bg-[#0b0e25] bg-opacity-80"
            }
          >
            <div className="text-6xl font-bold text-[#FFD700] drop-shadow-lg sm:text-md border-b-2 border-yellow-500 pb-2">
              <div className="text-2xl font-bold text-white drop-shadow-lg sm:text-md border border-gray-300 p-4">
                Cooldown: [
                {fetchedData &&
                  rawData[index] &&
                  rawData[index].cooldown &&
                  rawData[index].cooldown.join(" / ")}
                {""}]
              </div>
              <div className="text-2xl font-bold text-white drop-shadow-lg sm:text-md border border-gray-300 p-4">
                Mana Cost: [
                {fetchedData &&
                  rawData[index] &&
                  rawData[index].manaCost &&
                  rawData[index].manaCost.join(" / ")}
                {""}]
              </div>
            </div>
            <div className="text-4xl font-bold italic text-white drop-shadow-lg sm:text-md border-b-2 border-gray-300 pb-2">
              {fetchedData && ability.description}
            </div>
            <div
              className="text-2xl font-bold text-white drop-shadow-lg sm:text-md border border-gray-300 p-4"
              dangerouslySetInnerHTML={{
                __html:
                  fetchedData &&
                  fetchedRawDataQ &&
                  fetchedRawDataW &&
                  fetchedRawDataE &&
                  fetchedRawDataR &&
                  parseSpellText(
                    resolveSpellText(ability.tooltip, rawData[index])
                  ),
              }}
            />
          </div>
        ))}
    </div>
  );
};

export default AbilityDescription;
