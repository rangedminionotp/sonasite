"use client";
import React from "react";
import Description from "./Description";
import SonaSkinsImage from "./SonaSkinsImage";
import SonaSkinsItem from "./SonaSkinsItem";
import SkinContext from "./SharedContext";

const Skins = () => {
  const [skins, setSkins] = React.useState(null);

  React.useEffect(() => {
    const query = {
      query: `
        query MyQuery {
  getAllSkins {
    data {
      artist
      lore
      price
      releaseDate
      threeDURL
      voiceActor
    }
    id
    name
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
          alert("Error with skin, please try again");
        } else {
          console.log(json.data.getAllSkins);
          setSkins(json.data.getAllSkins);
        }
      })
      .catch((error) => {
        console.error("Error fetching skins:", error);
        alert("Failed to fetch skins. Please try again.");
      });
  }, []);

  return (
    <SkinContext.Provider value={{ skins, setSkins }}>
      <div name="skins" className="w-full h-screen relative">
        <div className="absolute inset-0 flex justify-center items-center">
          <Description />
        </div>
        <div className="flex flex-wrap justify-center ">
          <SonaSkinsItem />
        </div>
      </div>
    </SkinContext.Provider>
  );
};

export default Skins;
