import React from "react";
import DataContext from "../DataContext";

const SonaSkinsImage = () => {
  const { fetchedData, setFetchedData } = React.useContext(DataContext);
  console.log("fetcheddata", fetchedData);
  return <div></div>;
};

export default SonaSkinsImage;
