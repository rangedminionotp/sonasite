"use client";
import React from "react";
import Description from "./Description";
import SonaSkinsImage from "./SonaSkinsImage";
import SkinsItem from "./SkinsItem";
import SkinContext from "./SharedContext";
import DataContext from "../DataContext";
import SkinsNavbar from "./SkinsNavbar";
import { SkinOverView } from "./SkinOverView";
import Background from "@/app/utils/Background";
const Skins = () => {
  const [skins, setSkins] = React.useState(null);
  const [skin, setSkin] = React.useState(null);
  const [skinReviews, setSkinReviews] = React.useState<SkinOverView[]>(null);
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
    rating_count
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
          console.log("Error with skin, please try again");
        } else {
          setSkin(json.data.getAllSkins);
        }
      })
      .catch((error) => {
        console.error("Error fetching skins:", error);
        console.log("Failed to fetch skins. Please try again.");
      });
  }, [skins, skinReviews]);

  React.useEffect(() => {
    if (fetchedData && skin !== null) {
      const skinInfo = fetchedData.skins;
      skinInfo.map((item, index) => {
        item.info = skin[index];
      });
      setSkins(skinInfo);
    }
  });
  return (
    <SkinContext.Provider
      value={{
        skins,
        setSkins,
        skinReviews,
        setSkinReviews,
      }}
    >
      <div name="skins" className="w-full h-screen relative">
        <Background />
        <div className="absolute inset-0 flex justify-center items-center">
          <Description />
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <SkinsNavbar />
        </div>
        <div>{/* <SkinsItem /> */}</div>
      </div>
    </SkinContext.Provider>
  );
};

export default Skins;
