import React from "react";
import DataContext from "../DataContext";
import Image from "next/image";
const SonaSkinsImage = () => {
  const { fetchedData, setFetchedData } = React.useContext(DataContext);
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden"></div>
  );
};

export default SonaSkinsImage;
