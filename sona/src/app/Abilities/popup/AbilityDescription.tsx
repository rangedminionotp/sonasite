import React from "react";
import AbilitiesContext from "../SharedContext";
import Passive from "@/assets/abilities/Power_Chord.webp";
import Image from "next/image";
import AbilitiesVideo from "./AbilitiesVideo";
import ReactHtmlParser from "react-html-parser";

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
    fetchedRawDataQ,
  ];
  return (
    <div name="Overview" className="px-4 md:px-16 lg:px-24 font-inter">
      {fetchedData &&
        fetchedData.abilities.map((ability, index) => (
          <div
            key={`${ability.id}-popup-overview`}
            className={
              !abilityVisibility[index].active
                ? "hidden"
                : "top-0 left-0 w-full h-screen bg-[#0b0e25]"
            }
          >
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2  flex items-center justify-center p-4">
                <AbilitiesVideo index={index} />
              </div>
              <div className="md:w-1/2 p-4">
                <div className=" font-bold text-[#FFD700] drop-shadow-lg  border-b-2 border-yellow-500 pb-2">
                  {index !== 4 && (
                    <div className="ability-description-text w-auto font-bold text-white drop-shadow-lg  border border-gray-300 p-2">
                      <div>
                        Cooldown: [
                        {fetchedData &&
                          rawData[index] &&
                          rawData[index].cooldown &&
                          rawData[index].cooldown.join(" / ")}
                        ]
                      </div>
                    </div>
                  )}
                  {index !== 4 && (
                    <div className="ability-description-text w-auto font-bold text-white drop-shadow-lg  border border-gray-300 p-2">
                      <div>
                        Mana Cost: [
                        {fetchedData &&
                          rawData[index] &&
                          rawData[index].manaCost &&
                          rawData[index].manaCost.join(" / ")}
                        ]
                      </div>
                    </div>
                  )}
                </div>
                <div className="ability-description-text text-white drop-shadow-lg border-b-2 font-mono border-gray-300 pb-2">
                  {index !== 4 ? fetchedData && ability.description : null}
                </div>
                <div className="ability-description-text font-bold text-white drop-shadow-lg border border-gray-300 p-2">
                  {ReactHtmlParser(
                    fetchedData &&
                      rawData[index] &&
                      parseSpellText(
                        resolveSpellText(
                          index !== 4 ? ability.tooltip : ability.description,
                          rawData[index]
                        )
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AbilityDescription;
