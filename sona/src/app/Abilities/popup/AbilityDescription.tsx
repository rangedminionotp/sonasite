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
  }

  const magicDamageRegex = /<magicDamage>(.*?)<\/magicDamage>/g;
  const keywordMajorRegex = /<keywordMajor>(.*?)<\/keywordMajor>/g;
  const spellPassiveRegex = /<spellPassive>(.*?)<\/spellPassive>/g;
  const healingRegex = /<healing>(.*?)<\/healing>/g;
  const shieldRegex = /<shield>(.*?)<\/shield>/g;
  const speedRegex = /<speed>(.*?)<\/speed>/g;
  const statusRegex = /<status>(.*?)<\/status>/g;
  const brRegex = /<br\s*\/?>/g;
  const parsedText = spellText
    .split(brRegex)
    .map((part, index) => {
      if (index % 2 === 1) {
        // If the index is odd, it means we're inside a <br> tag
        return <br />;
      } else {
        // Otherwise, handle other replacements
        return part.split(magicDamageRegex).map((innerPart, innerIndex) => {
          if (innerIndex % 2 === 1) {
            // Matching text wrapped in span for magic damage
            return <span className="text-blue-500 font-bold">{innerPart}</span>;
          }
          return innerPart
            .split(keywordMajorRegex)
            .map((keywordPart, keywordIndex) => {
              if (keywordIndex % 2 === 1) {
                // Matching text wrapped in span for keyword major
                return (
                  <span
                    className="text-yellow-500 font-bold"
                    // key={keywordIndex}
                  >
                    {keywordPart}
                  </span>
                );
              }
              return keywordPart
                .split(spellPassiveRegex)
                .map((passivePart, passiveIndex) => {
                  if (passiveIndex % 2 === 1) {
                    // Matching text wrapped in span for spell passive
                    return (
                      <span
                        className="font-bold text-gray-500"
                        // key={passiveIndex}
                      >
                        {passivePart}
                      </span>
                    );
                  }
                  return passivePart
                    .split(healingRegex)
                    .map((healingPart, healingIndex) => {
                      if (healingIndex % 2 === 1) {
                        // Matching text wrapped in span for healing
                        return (
                          <span
                            className="text-green-500 font-bold"
                            // key={healingIndex}
                          >
                            {healingPart}
                          </span>
                        );
                      }
                      return healingPart
                        .split(shieldRegex)
                        .map((shieldPart, shieldIndex) => {
                          if (shieldIndex % 2 === 1) {
                            // Matching text wrapped in span for shield
                            return (
                              <span
                                className="text-green-600 font-bold"
                                // key={shieldIndex}
                              >
                                {shieldPart}
                              </span>
                            );
                          }
                          return shieldPart; // Non-matching text
                        });
                    });
                });
            });
        });
      }
    })
    .flat();
  return parsedText;
};
const AbilityDescription = () => {
  const abilities = [Q, W, E];
  const {
    abilityVisibility,
    setAbilityVisibility,
    fetchedData,
    fetchedRawDataQ,
    fetchedRawDataW,
    fetchedRawDataE,
    breadcrumbs,
    setBreadcrumbs,
  } = React.useContext(AbilitiesContext);
  const rawData = [
    fetchedRawDataQ,
    fetchedRawDataW,
    fetchedRawDataE,
    fetchedRawDataW,
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
            <div className="text-2xl font-bold text-white drop-shadow-lg sm:text-md border border-gray-300 p-4">
              {fetchedData &&
                fetchedRawDataQ &&
                fetchedRawDataW &&
                fetchedRawDataE &&
                resolveSpellText(ability.tooltip, rawData[index])}
            </div>
          </div>
        ))}{" "}
    </div>
  );
};

export default AbilityDescription;
