"use client";

import React from "react";
import Abilities from "./Abilities/Abilities";
import DataContext from "./DataContext";
import Intro from "./Intro/Intro";
import Navbar from "./Navbar/Navbar";
import Skins from "./Skins/Skins";
import { SonaOverview } from "./api/graphql/fetchdata/schema";
const AllComponents = ({ data }: { data: SonaOverview }) => {
  const [fetchedData, setFetchedData] = React.useState(data);
  return (
    <DataContext.Provider value={{ fetchedData, setFetchedData }}>
      <div>
        <Navbar />
        <div>
          <Intro />
          <Abilities />
          <Skins />
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default AllComponents;
