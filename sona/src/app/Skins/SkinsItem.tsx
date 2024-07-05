import React from "react";
import SkinContext from "./SharedContext";
import icons from "@data/icons.json";
import Image from "next/image";
import CakeIcon from "@mui/icons-material/Cake";
import Tooltip from "@mui/joy/Tooltip";
import Skeleton from "@mui/joy/Skeleton";
import SkinItemRating from "./SkinsItemRating";
import SkinReviewsDisplay from "./SkinReviews/SkinReviewsDisplay";
import AddCustomLore from "./CustomLore/AddCustomLore";
import AddLorePopup from "./CustomLore/AddLorePopup";
import CustomLoreDisplay from "./CustomLore/CustomLoreDisplay";
import ViewCustomLore from "./CustomLore/ViewCustomLore";
const SkinsItem = () => {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [activeSkinId, setActiveSkinId] = React.useState<uuid>(null);
  const [bgIndex, setBgIndex] = React.useState<number>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const [activeImgUrl, setActiveImgUrl] = React.useState<string>(null);
  const [addLoreOpen, setAddLoreOpen] = React.useState<boolean>(false);
  const [currItem, setCurrItem] = React.useState<any>(null);

  const { skins } = React.useContext(SkinContext);

  if (!skins) {
    return (
      <div className="flex flex-wrap">
        {Array.from(new Array(4)).map((_, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/4 px-2 mb-8">
            <Skeleton variant="rectangular" height={200} className="mb-4" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
          </div>
        ))}
      </div>
    );
  }

  const toggleVisibility = (skin_id: uuid, index: number, skin_url: string) => {
    setActiveSkinId(skin_id);
    setBgIndex(index);
    setOpen(true);
    setActiveImgUrl(skin_url);
  };

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

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30); // Approximate months
    const days = diffDays % 30;

    // Construct the result string based on years, months, and days
    let result = "";
    if (years > 0) {
      result += `${years} year${years > 1 ? "s" : ""} `;
    }
    if (months > 0) {
      result += `${months} month${months > 1 ? "s" : ""} `;
    }
    if (days > 0) {
      result += `${days} day${days > 1 ? "s" : ""} `;
    }

    return result.trim() + " ago";
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
    <div name="skins-container" className="text-center justify-center">
      {skins.map((item, index) => (
        <div key={index} className="w-full lg:w-1/2 px-2 mb-8" name={item.name}>
          <div
            className={`p-4 relative rounded-lg shadow-md text-center justify-center bg-primary ${bgGradient[index]} h-full`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative overflow-hidden">
              <div className="absolute top-0 left-0 z-10 px-2 py-1 text-3xl font-semibold">
                <h1
                  style={{
                    color: "#253942",
                    textShadow:
                      "-0.7px -0.7px 0 #CAABCD, 0.7px -0.7px 0 #CAABCD, -0.7px 0.7px 0 #CAABCD, 0.7px 0.7px 0 #CAABCD",
                  }}
                  className="text-[#82631a]"
                >
                  {item.name}
                </h1>
                <div className="flex gap-1 items-center">
                  {item.info.data.price === "Special" ? null : (
                    <Image
                      alt={icons.rp}
                      src={icons.rp}
                      className="object-cover"
                      width={30}
                      height={30}
                    />
                  )}
                  <p className="text-sm text-gray-200 mb-1 font-sans text-shadow-[_0_1px_0_rgb(0_0_0_/_40%)]">
                    {item.info.data.price}
                  </p>
                </div>
              </div>
              <Image
                src={item.imgURL}
                alt={item.name}
                width={100}
                height={100}
                className="w-full mb-4 hover:scale-110 transition-transform duration-300 rounded-md"
              />
              {isHovered && (
                <div>
                  <div
                    onClick={() =>
                      toggleVisibility(item.info.id, index, item.imgURL)
                    }
                    className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-md p-2 hover:cursor-pointer font-semibold font-sans text-xl"
                  >
                    SHOW REVIEWS
                  </div>

                  <div className="absolute bottom-0 left-0 w-full flex p-4 gap-3 shadow-md bg-black bg-opacity-50">
                    <div className="flex">
                      <Tooltip
                        title={`${item.name} was released on ${parseDate(
                          item.info.data.releaseDate
                        )} (
                    ${daysAgo(item.info.data.releaseDate)})`}
                      >
                        <p className="text-sm text-gray-300 mb-1 font-sans">
                          <CakeIcon style={{ color: "#CEB57C" }} />{" "}
                          {parseDate(item.info.data.releaseDate)} (
                          {daysAgo(item.info.data.releaseDate)})
                        </p>
                      </Tooltip>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Image
                        alt={""}
                        src={icons.artist}
                        objectFit="cover"
                        className="object-cover"
                        width={20}
                        height={20}
                      />
                      <Tooltip
                        title={`${item.name} was drawn by ${item.info.data.artist}`}
                      >
                        <p className="text-sm text-gray-300 mb-1 font-sans">
                          {item.info.data.artist}
                        </p>
                      </Tooltip>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image
                        alt={""}
                        src={icons.voice}
                        className="object-cover"
                        width={20}
                        height={20}
                      />
                      <Tooltip
                        title={`${item.name} was voiced by ${item.info.data.voiceActor}`}
                      >
                        <p className="text-sm text-gray-300 mb-1 font-sans">
                          {item.info.data.voiceActor}
                        </p>
                      </Tooltip>
                    </div>
                    <div className="flex">
                      <Tooltip title={`${item.name} has a 3D model available`}>
                        <a
                          href={item.info.data.threeDURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 font-bold hover:underline"
                        >
                          3D Model
                        </a>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Tooltip
              title={`${item.info.rating_count} Sona meows rated ${item.name} (✿◡‿◡)`}
            >
              <div>
                <SkinItemRating
                  setRating={null}
                  rating={item.info.rating}
                  readOnlyBoolean={true}
                />
              </div>
            </Tooltip>
            <div className="text-sm text-gray-300 mb-1 font-sans font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.5)]">
              {item.info.data.lore === "" ? (
                <CustomLoreDisplay skin_id={item.info.id} />
              ) : (
                item.info.data.lore
              )}
            </div>

            <div>
              {item.info.data.lore === "" ? (
                <div className="flex justify-center">
                  <div onClick={() => setCurrItem(item)} name="addCustomLore">
                    <AddCustomLore
                      skinName={item.name}
                      setAddLoreOpen={setAddLoreOpen}
                    />
                  </div>
                  <AddLorePopup
                    open={addLoreOpen}
                    setOpen={setAddLoreOpen}
                    skinName={currItem?.name}
                    skinImgURL={currItem?.imgURL}
                    skin_id={currItem?.info.id}
                  />
                  <div name="seeCustomLore">
                    <ViewCustomLore
                      skin_id={item.info.id}
                      bgColor={bgGradient[bgIndex]}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
      {activeSkinId && (
        <SkinReviewsDisplay
          skin_id={activeSkinId}
          open={open}
          setOpen={setOpen}
          bgColor={bgGradient[bgIndex]}
          activeImgUrl={activeImgUrl}
        />
      )}
    </div>
  );
};

export default SkinsItem;
