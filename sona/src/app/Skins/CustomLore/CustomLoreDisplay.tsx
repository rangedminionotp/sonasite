import React from "react";

const getRandomNumber = (length: number): number => {
  return Math.floor(Math.random() * length);
};

const CustomLoreDisplay = ({ skin_id }) => {
  const [randomNumber, setRandomNumber] = React.useState<number>(0);
  const [customLore, setCustomLore] = React.useState<string>(null);

  React.useEffect(() => {
    const savedLore = localStorage.getItem(`customLore_${skin_id}`);
    const savedRandomNumber = localStorage.getItem(`randomNumber_${skin_id}`);
    const savedTimestamp = localStorage.getItem(`timestamp_${skin_id}`);
    const hours = 24;
    const hour = 60 * 60 * 1000;
    const now = new Date().getTime();
    const oneDayInMilliseconds = hours * hour;

    if (
      savedLore &&
      savedRandomNumber &&
      savedTimestamp &&
      now - parseInt(savedTimestamp, 10) < oneDayInMilliseconds
    ) {
      // Use saved values if they exist and are not expired
      setCustomLore(JSON.parse(savedLore));
      setRandomNumber(parseInt(savedRandomNumber, 10));
    } else {
      // Fetch new data if no saved values or if they are expired
      const query = {
        query: `
          query MyQuery { 
            getLoreBySkinId(skin_id: "${skin_id}") {
              lore
              id
              owner_id
              skin_id
              time
            }
          }
        `,
      };

      fetch("/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.errors) {
            alert("Error with fetching custom skin lore, please try again");
          } else {
            const lore = json.data?.getLoreBySkinId;
            const randomNum = getRandomNumber(lore.length);

            setCustomLore(lore);
            setRandomNumber(randomNum);

            // Save to local storage
            localStorage.setItem(`customLore_${skin_id}`, JSON.stringify(lore));
            localStorage.setItem(
              `randomNumber_${skin_id}`,
              randomNum.toString()
            );
            localStorage.setItem(`timestamp_${skin_id}`, now.toString());
          }
        })
        .catch((error) => {
          console.error("Error fetching custom skin lore:", error);
          alert("Failed fetching custom skin lore. Please try again.");
        });
    }
  }, [skin_id]);

  return <>{customLore && <div>{customLore[randomNumber]?.lore} </div>}</>;
};

export default CustomLoreDisplay;
