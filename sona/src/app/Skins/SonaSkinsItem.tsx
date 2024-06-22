import React from "react";
import DataContext from "../DataContext";
import SkinContext from "./SharedContext";
const SonaSkinsItem = () => {
  const { fetchedData, setFetchedData } = React.useContext(DataContext);
  const { skins } = React.useContext(SkinContext);
  if (!fetchedData || !fetchedData.skins || !skins) {
    return <div>Loading...</div>;
  }

  // Combine the two arrays
  const skinInfo = fetchedData.skins;
  skinInfo.map((item, index) => {
    item.info = skins[index];
  });
  console.log("skins", skinInfo);
  const parseDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const daysAgo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const bgGradient = [
    // classic
    "bg-gradient-to-r from-[#21293E] via-[#8C9EB2] to-[#D19E9D]",
    // muse
    "bg-gradient-to-r from-[#51601F] via-[#B0C5E0] to-[#D1B583]",
    // pentakill og
    "bg-gradient-to-r from-black to-red-200",
    // silent night
    "bg-gradient-to-r from-[#7D1D00] via-[#DE923D] to-[#173207]",
    //guqin
    "bg-gradient-to-r from-[#410B01] via-[#F1B0DB] to-[#D7BAAA]",
    // arcade
    "bg-gradient-to-r from-[#BEE3F6] via-[#7858A3] to-[#B51E85]",
    // dj
    "bg-gradient-to-r from-[#0D3072] via-[#1E6E8F] to-[#C9FCD1]",
    // sweetheart
    "bg-gradient-to-r from-[#C69994] via-[#91709B] to-[#EA539A]",
    // odyssey
    "bg-gradient-to-r from-[#A3703B] via-[#4E837B] to-[#D8AB50]",
    // psyops
    "bg-gradient-to-r from-[#446971] via-[#B4B8C4] to-[#273A58]",
    // new pentakill
    "bg-gradient-to-r from-[#D8BB99] via-[#DF512B] to-[#40121C]",
    // star guardian
    "bg-gradient-to-r from-[#8A4E72] via-[#78BDAB] to-[#549AA6]",
    // immortal journey
    "bg-gradient-to-r from-[#5D4F70] via-[#ACC1DE] to-[#CAABCD]",
    // prestiage immortal journey
    "bg-gradient-to-r from-[#393A3E] via-[#92ACC7] to-[#253942]",
  ];
  return (
    <div className="flex flex-wrap ">
      {skinInfo.map((item, index) => (
        <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-8">
          <div
            className={`border border-gray-200 p-4 rounded-lg shadow-md ${bgGradient[index]} bg-transparent`}
          >
            <img
              src={item.imgURL}
              alt={item.name}
              className="w-full h-auto rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <p className="text-sm text-gray-600 mb-1">
              Lore: {item.info.data.lore}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Price: {item.info.data.price}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Release Date: {parseDate(item.info.data.releaseDate)} (
              {daysAgo(item.info.data.releaseDate)} days ago)
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Artist: {item.info.data.artist}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Voice Actor: {item.info.data.voiceActor}
            </p>
            <a
              href={item.info.data.threeDURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              3D Model
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SonaSkinsItem;
