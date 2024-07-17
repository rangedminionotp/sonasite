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
  const [itemData, setItemData] = React.useState(null);
  const [runeData, setRuneData] = React.useState(null);
  const [itemTree, setItemTree] = React.useState(null);
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
        }
      });
  };

  const fetchItemData = () => {
    const query = {
      query: `query MyQuery {
  fetchItemData {
    epic {
      name
      tags
      buildFrom
      buildInto
      gold {
        base
        sell
        purchasable
        total
      }
      id
      image
      plaintext
    }
    basic {
      tags
      name
      buildFrom
      buildInto
      gold {
        base
        purchasable
        sell
        total
      }
      image
      id
      plaintext
    }
    legendary {
      name
      tags
      buildFrom
      buildInto
      id
      image
      plaintext
      gold {
        base
        purchasable
        sell
        total
      }
    }
    starter {
      name
      tags
      buildFrom
      buildInto
      image
      plaintext
      id
      gold {
        base
        purchasable
        sell
        total
      }
    }
      boots {
      name
      tags
      buildFrom
      buildInto
      gold {
        base
        purchasable
        sell
        total
      }
      id
      inStore
      image
      plaintext
    }
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
          console.log("Error with fetching item data, please try again");
        } else {
          setItemData(json.data.fetchItemData);
        }
      });
  };

  const fetchItemTree = () => {
    const query = {
      query: `query { fetchItemTree { header tags } }`,
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
          console.log("Error with fetching item tree, please try again");
        } else {
          setItemTree(json.data.fetchItemTree);
        }
      });
  };

  const fetchRuneData = async () => {
    const query = {
      query: `query MyQuery {
  fetchRuneData {
    icon
    id
    key
    name
    slots {
      rowFour {
        name
        icon
        id
        key
        longDesc
        shortDesc
        index
      }
      rowOne {
        name
        icon
        id
        key
        longDesc
        shortDesc
        index
      }
      rowTwo {
        name
        icon
        id
        key
        longDesc
        shortDesc
        index
      }
      rowThree {
        name
        icon
        id
        key
        longDesc
        shortDesc
        index
      }
    }
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
          setRuneData(json.data.fetchRuneData);
        }
      });
  };

  React.useEffect(() => {
    fetchData();
    fetchSummonerData();
    fetchItemData();
    fetchRuneData();
    fetchItemTree();
  }, []);

  return (
    <DataContext.Provider value={{ fetchedData, setFetchedData }}>
      <div>
        <Navbar />
        <div>
          {/* <Intro />
          <Abilities />
          <Skins /> */}
          <Guides
            summonerData={summonerData}
            itemData={itemData}
            runeData={runeData}
            itemTree={itemTree}
          />
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default AllComponents;
