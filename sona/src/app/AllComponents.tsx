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
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const sonaService = new SonaService();
        const data = await sonaService.FetchVersion();
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ fetchedData, setFetchedData }}>
      <div>
        <Navbar />
        <div>
          <Intro />
          <Abilities />
          <Skins />
          <Guides />
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default AllComponents;
