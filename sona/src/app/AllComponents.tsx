"use client";

import Image from "next/image";
import Navbar from "./Navbar/Navbar";
import Intro from "./Intro/Intro";
import Abilities from "./Abilities/Abilities";
import DataContext from "./DataContext";
import { SonaService } from "./api/graphql/fetchdata/service";
import React from "react";
import Skins from "./Skins/Skins";
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
      <>
        <Navbar />
        <Intro />
        <Abilities />
        {/* <Skins /> */}
      </>
    </DataContext.Provider>
  );
};

export default AllComponents;
