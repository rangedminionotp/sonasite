import React from "react";
import AbilitiesContext from "./SharedContext";
import magicDamage from "./MagicDamage";
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
              <span className="text-blue-500" key={innerIndex}>
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
  const { divVisibility, setDivVisibility, fetchedData, fetchedRawDataQ } =
    React.useContext(AbilitiesContext);

  return (
    <div>
      {fetchedData &&
        fetchedData.abilities.map((ability, index) => (
          <div
            className={
              !divVisibility[`div${index}`]
                ? "hidden"
                : "top-0 left-0 w-full h-screen bg-[#181818] bg-opacity-90"
            }
          >
            <div className="text-4xl font-bold text-[#FFD700] drop-shadow-lg sm: text-md">
              {fetchedData && ability.name}
            </div>
            <div className="text-5xl font-bold text-white italic drop-shadow-lg sm:text-md">
              {fetchedData && ability.description}
            </div>
            <div className="text-2xl font-bold text-white drop-shadow-lg sm:text-md">
              {fetchedData &&
                fetchedRawDataQ &&
                resolveSpellText(ability.tooltip, fetchedRawDataQ)}
            </div>
          </div>
        ))}
      <div></div>
    </div>
  );
};

export default AbilityDescription;
