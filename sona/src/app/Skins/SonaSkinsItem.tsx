import React from "react";
import DataContext from "../DataContext";

const SonaSkinsItem = () => {
  const { fetchedData, setFetchedData } = React.useContext(DataContext);

  return (
    <div className="flex flex-wrap ">
      {fetchedData &&
        fetchedData.skins.map((item, index) => {
          return (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-8">
              <div className="border p-4">
                <img
                  src={item.imgURL}
                  alt={item.name}
                  className="w-full h-auto"
                />
                <div>{item.name}</div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SonaSkinsItem;
