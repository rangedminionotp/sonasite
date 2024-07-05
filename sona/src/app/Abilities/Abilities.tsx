"use client";

import React from "react";
import Description from "./Description";
import Display from "./Display";
import BasicAbilities from "./BasicAbilities";
import PassiveAb from "./PassiveAb";
import UltAb from "./UltAb";
import AbilitiesContext from "./SharedContext";
import DataContext from "../DataContext";
import { SonaService } from "../api/graphql/fetchdata/service";
// import AbilityDescription from "./AbilityDescription";
import PassiveDes from "./PassiveDes";
import Background from "@/app/utils/Background";

import AbilitiesPopup from "./popup/AbilitiesPopup";
import { AbilityService } from "../api/graphql/Ability/service";
const Abilities = () => {
  // boolean to see if user click on abilities expansion
  const [abilityVisibility, setAbilityVisibility] = React.useState([
    { label: "SonaQ", active: false },
    { label: "SonaW", active: false },
    { label: "SonaE", active: false },
    { label: "SonaR", active: false },
    { label: "Passive", active: false },
  ]);
  // fetch data from 'https://ddragon.leagueoflegends.com/cdn/latest_version/data/en_US/champion/Sona.json'
  // const [fetchedData, setFetchedData] = React.useState(null);
  const [fetchedRawDataQ, setFetchedRawDataQ] = React.useState(null);
  const [fetchedRawDataW, setFetchedRawDataW] = React.useState(null);
  const [fetchedRawDataE, setFetchedRawDataE] = React.useState(null);
  const [fetchedRawDataR, setFetchedRawDataR] = React.useState(null);
  const [abilities, setAbilities] = React.useState([]);
  const [currAbility, setCurrAbility] = React.useState(null);
  const [abilityTips, setabilityTips] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(null);

  const { fetchedData, setFetchedData } = React.useContext(DataContext);

  const [breadcrumbs, setBreadcrumbs] = React.useState([
    { label: "Overview", active: true },
    { label: "Player Tip", active: false },
    { label: "Add Tip", active: false },
  ]);

  React.useEffect(() => {
    const query = {
      query: `
        query MyQuery {
          getAllAbility {
            abilityId
            abilityName 
            fullName 
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
          console.log("Error with ability id, please try again");
        } else {
          setAbilities(json.data.getAllAbility);
        }
      })
      .catch((error) => {
        console.error("Error fetching abilities:", error);
      });
  }, []); // Empty dependency array to run once

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const sonaService = new SonaService();
  //       const data = await sonaService.FetchVersion();
  //       setFetchedData(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
        setFetchedRawDataE(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRawDataE();
  }, []);

  React.useEffect(() => {
    const fetchRawDataR = async () => {
      try {
        const sonaService = new SonaService();
        const data = await sonaService.FetchRawR();
        setFetchedRawDataR(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRawDataR();
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
        fetchedRawDataR,
        setFetchedRawDataW,
        breadcrumbs,
        setBreadcrumbs,
        abilities,
        setAbilities,
        currAbility,
        setCurrAbility,
        abilityTips,
        setabilityTips,
        activeIndex,
        setActiveIndex,
      }}
    >
      <div name="abilities" className="w-full h-screen relative">
        {/* <Background /> */}
        <div className="absolute inset-0 flex justify-center items-center">
          <Description />
        </div>
        <div
          name="abilities-icon"
          className="flex h-[500px] w-full flex-wrap items-center justify-center gap-8"
        >
          <div className="flex w-full items-center justify-center px-[5%] xxxs:py-[50%] xxs:py-[75%] xs:py-[40%] sm:py-[40%] md:py-[50%] lg:py-[30%] xl:py-[25%] 2xl:py-[20%] 3xl:py-[25%]">
            <PassiveAb />
            <BasicAbilities />
            <UltAb />
            <AbilitiesPopup />
          </div>
        </div>
      </div>
    </AbilitiesContext.Provider>
  );
};

export default Abilities;
