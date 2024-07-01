import React from "react";

const getRandomNumber = (length: number): number => {
  return Math.floor(Math.random() * length);
};

const CustomLoreDisplay = ({ skin_id }) => {
  const [customLore, setCustomLore] = React.useState<string>(null);
  const [randomNumber, setRandomNumber] = React.useState<number>(0);
  React.useEffect(() => {
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
          setCustomLore(json.data?.getLoreBySkinId);
          setRandomNumber(getRandomNumber(json.data.getLoreBySkinId.length));
        }
      })
      .catch((error) => {
        console.error("Error fetching custom skin lore:", error);
        alert("Failed fetching custom skin lore. Please try again.");
      });
  }, []);

  return <>{customLore && <div>{customLore[randomNumber]?.lore} </div>}</>;
};

export default CustomLoreDisplay;
