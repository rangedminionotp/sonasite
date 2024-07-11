"use client";

import Image from "next/image";
import Navbar from "./Navbar/Navbar";
import Intro from "./Intro/Intro";
import Abilities from "./Abilities/Abilities";
import DataContext from "./DataContext";
import { SonaService } from "./api/graphql/fetchdata/service";
import React from "react";
import Skins from "./Skins/Skins";
import Guides from "./Guides/Guides";
const AllComponents = () => {
  const [fetchedData, setFetchedData] = React.useState(null);
  const [summonerData, setSummonerData] = React.useState(null);
  const fetchData = async () => {
    try {
      const sonaService = new SonaService();
      const data = await sonaService.FetchVersion();
      setFetchedData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchSummonerData = () => {
    const query = {
      query: `query {
      fetchSummonerData {
        version
        id
        name
        description
        cooldown
        imageURL
      }
    }`,
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
          setSummonerData(json.data.fetchSummonerData);
          console.log("summoner data", json.data.fetchSummonerData);
        }
      });
  };

  const fetchItemData = () => {
    fetch("/api/fetchItemData")
      .then((res) => res.json())
      .then((json) => {
        console.log("item data", json);
      });
  };

  React.useEffect(() => {
    fetchData();
    fetchSummonerData();
    fetchItemData();
  }, []);

  return (
    <DataContext.Provider value={{ fetchedData, setFetchedData }}>
      <div>
        <Navbar />
        <div>
          <Intro />
          <Abilities />
          <Skins />
          <Guides summonerData={summonerData} />
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default AllComponents;
