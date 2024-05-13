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
// import AbilityDescription from "./AbilityDescription";
import PassiveDes from "./PassiveDes";
import AbilitiesPopup from "./popup/AbilitiesPopup";
const Abilities = () => {
  // boolean to see if user click on abilities expansion
  const [abilityVisibility, setAbilityVisibility] = React.useState([
    { label: "SonaQ", active: false },
    { label: "SonaW", active: false },
    { label: "SonaE", active: false },
    { label: "SonaR", active: false },
    { label: "passive", active: false },
  ]);
  // fetch data from 'https://ddragon.leagueoflegends.com/cdn/latest_version/data/en_US/champion/Sona.json'
  const [fetchedData, setFetchedData] = React.useState(null);
  const [fetchedRawDataQ, setFetchedRawDataQ] = React.useState(null);
  const [fetchedRawDataW, setFetchedRawDataW] = React.useState(null);
  const [fetchedRawDataE, setFetchedRawDataE] = React.useState(null);
  const [breadcrumbs, setBreadcrumbs] = React.useState([
    { label: "Overview", active: true },
    { label: "Player Tip", active: false },
    { label: "Add Tip", active: false },
    { label: "Tutorials", active: false },
  ]);
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

  React.useEffect(() => {
    const fetchRawDataQ = async () => {
      try {
        const sonaService = new SonaService();
        const data = await sonaService.FetchRawQ();
        setFetchedRawDataQ(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRawDataQ();
  }, []);

  React.useEffect(() => {
    const fetchRawDataW = async () => {
      try {
        const sonaService = new SonaService();
        const data = await sonaService.FetchRawW();
        setFetchedRawDataW(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRawDataW();
  }, []);

  React.useEffect(() => {
    const fetchRawDataE = async () => {
      try {
        const sonaService = new SonaService();
        const data = await sonaService.FetchRawE();
        console.log(data);
        setFetchedRawDataE(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRawDataE();
  }, []);

  return (
    <AbilitiesContext.Provider
      value={{
        abilityVisibility,
        setAbilityVisibility,
        fetchedData,
        fetchedRawDataQ,
        fetchedRawDataW,
        fetchedRawDataE,
        setFetchedRawDataW,
        breadcrumbs,
        setBreadcrumbs,
      }}
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
          <AbilitiesPopup />
          {/* <AbilityDescription /> */}
          <PassiveDes />
        </div>
      </div>
    </AbilitiesContext.Provider>
  );
};

export default Abilities;
