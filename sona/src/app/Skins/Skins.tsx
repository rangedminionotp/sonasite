"use client";
import React from "react";
import Description from "./Description";
import SonaSkinsImage from "./SonaSkinsImage";
import SkinsItem from "./SkinsItem";
import SkinContext from "./SharedContext";
import DataContext from "../DataContext";
import SkinsNavbar from "./SkinsNavbar";
const Skins = () => {
  const [skins, setSkins] = React.useState(null);
  const [skin, setSkin] = React.useState(null);
  const { fetchedData, setFetchedData } = React.useContext(DataContext);

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
    rating
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
          setSkin(json.data.getAllSkins);
        }
      })
      .catch((error) => {
        console.error("Error fetching skins:", error);
        alert("Failed to fetch skins. Please try again.");
      });
  }, []);

  React.useEffect(() => {
    if (fetchedData && skin !== null) {
      let meow = [];
      const skinInfo = fetchedData.skins;
      skinInfo.map((item, index) => {
        item.info = skin[index];
        meow.push(skin[index].id);
      });
      setSkins(skinInfo);
      console.log(meow);
    }
  });
  return (
    <SkinContext.Provider value={{ skins, setSkins }}>
      <div name="skins" className="w-full h-screen relative">
        <div>
          <Description />
        </div>
        <div>
          <SkinsNavbar />
        </div>
        <div>
          <SkinsItem />
        </div>
      </div>
    </SkinContext.Provider>
  );
};

export default Skins;
