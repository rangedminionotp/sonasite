"use client";

import React from "react";
import Background from "../Intro/Background";
import Description from "./Description";
import Display from "./Display";
import BasicAbilities from "./BasicAbilities";
import PassiveAb from "./PassiveAb";
import UltAb from "./UltAb";
import AbilitiesContext from "./SharedContext";
import { SonaService } from "../graphql/fetchdata/service";
import AbilityDescription from "./AbilityDescription";
import PassiveDes from "./PassiveDes";
const Abilities = () => {
  // boolean to see if user click on abilities expansion
  const [divVisibility, setDivVisibility] = React.useState({
    div0: false,
    div1: false,
    div2: false,
    div3: false,
    div4: false,
  });
  // fetch data from 'https://ddragon.leagueoflegends.com/cdn/latest_version/data/en_US/champion/Sona.json'
  const [fetchedData, setFetchedData] = React.useState(null);
  const [fetchedRawDataQ, setFetchedRawDataQ] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const sonaService = new SonaService();
        const data = await sonaService.FetchVersion();
        setFetchedData(data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const fetchRawData = async () => {
      try {
        const sonaService = new SonaService();
        const data = await sonaService.FetchRawQ();
        setFetchedRawDataQ(data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRawData();
  }, []);

  return (
    <AbilitiesContext.Provider
      value={{ divVisibility, setDivVisibility, fetchedData, fetchedRawDataQ }}
    >
      <div name="abilities" className="w-full h-screen relative">
        <Background />
        <div className="absolute inset-0 flex justify-center items-center">
          <Description />
        </div>
        <div
          name="abilities-icon"
          className="absolute inset-0 flex justify-center items-center"
        >
          <PassiveAb />
          <BasicAbilities />
          <UltAb />
          <AbilityDescription />
          <PassiveDes />
        </div>
      </div>
    </AbilitiesContext.Provider>
  );
};

export default Abilities;
