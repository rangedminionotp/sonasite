import React from "react";
import AbilitiesContext from "../SharedContext";
import magicDamage from "./MagicDamage";
import Q from "../../../../assets/abilities/Hymn_of_Valor.webp";
import W from "../../../../assets/abilities/Aria_of_Perseverance.webp";
import E from "../../../../assets/abilities/Song_of_Celerity.webp";
import Image from "next/image";
import AbilitiesNavbar from "./AbilitiesNavbar";

const resolveSpellText = (spellText, variables) => {
  // Loop through each variable and replace placeholders in the spell text
  for (const [key, value] of Object.entries(variables)) {
    spellText = spellText.replace(`{{ ${key} }}`, value);
    console.log(key, value);
  }
  const magicDamageRegex = /<magicDamage>(.*?)<\/magicDamage>/g;
  const keywordMajorRegex = /<keywordMajor>(.*?)<\/keywordMajor>/g;
  const brRegex = /<br\s*\/?>/g;
  const parsedText = spellText
    .split(brRegex)
    .map((part, index) => {
      if (index % 2 === 1) {
        // If the index is odd, it means we're inside a <br> tag
        return <br key={index} />;
      } else {
        // Otherwise, handle other replacements
        return part.split(magicDamageRegex).map((innerPart, innerIndex) => {
          if (innerIndex % 2 === 1) {
            // Matching text wrapped in span for magic damage
            return (
              <span className="text-blue-500 font-bold" key={innerIndex}>
                {innerPart}
              </span>
            );
          }
          return innerPart
            .split(keywordMajorRegex)
            .map((keywordPart, keywordIndex) => {
              if (keywordIndex % 2 === 1) {
                // Matching text wrapped in span for keyword major
                return (
                  <span
                    className="text-yellow-500 font-bold"
                    key={keywordIndex}
                  >
                    {keywordPart}
                  </span>
                );
              }
              return keywordPart; // Non-matching text
            });
        });
      }
    })
    .flat();
  return parsedText;
};
const AbilityDescription = () => {
  const abilities = [Q, W, E];
  const { divVisibility, setDivVisibility, fetchedData, fetchedRawDataQ } =
    React.useContext(AbilitiesContext);

  return (
    <div name="Overview">
      {fetchedData &&
        fetchedData.abilities.map((ability, index) => (
          <div
            className={
              !divVisibility[`div${index}`]
                ? "hidden"
                : "top-0 left-0 w-full h-screen bg-[#0b0e25] bg-opacity-80 absolute"
            }
          >
            <div className="text-6xl font-bold text-[#FFD700] drop-shadow-lg sm:text-md border-b-2 border-yellow-500 pb-2">
              <div className="text-2xl font-bold text-white drop-shadow-lg sm:text-md border border-gray-300 p-4">
                Cooldown: [
                {fetchedData &&
                  fetchedRawDataQ &&
                  fetchedRawDataQ.cooldown &&
                  fetchedRawDataQ.cooldown.join(" / ")}{" "}
                ]
              </div>
              <div className="text-2xl font-bold text-white drop-shadow-lg sm:text-md border border-gray-300 p-4">
                Mana Cost: [
                {fetchedData &&
                  fetchedRawDataQ &&
                  fetchedRawDataQ.manaCost &&
                  fetchedRawDataQ.manaCost.join(" / ")}{" "}
                ]
              </div>
            </div>
            <div className="text-4xl font-bold italic text-white drop-shadow-lg sm:text-md border-b-2 border-gray-300 pb-2">
              {fetchedData && ability.description}
            </div>
            <div className="text-2xl font-bold text-white drop-shadow-lg sm:text-md border border-gray-300 p-4">
              {fetchedData &&
                fetchedRawDataQ &&
                resolveSpellText(ability.tooltip, fetchedRawDataQ)}
            </div>
          </div>
        ))}{" "}
    </div>
  );
};

export default AbilityDescription;
