import React from "react";
import Background from "@/app/utils/Background";
import Description from "./Description";
import AddGuidesBtn from "./AddGuidesBtn";
import ViewGuidesBtn from "./ViewGuidesBtn";
import AddGuideDisplay from "./AddGuides/AddGuideDisplay";
import { Link } from "react-scroll";

const Guides = ({ summonerData, itemData, runeData }) => {
  const [addGuideOpen, setAddGuideOpen] = React.useState(false);
  return (
    <div name="guides" className="h-screen w-full relative overflow-x-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <Description />
      </div>
      <div className="absolute inset-0 flex justify-center gap-4 items-center">
        <Link to="guides" smooth={true} duration={200}>
          <AddGuidesBtn setOpen={setAddGuideOpen} />
          <ViewGuidesBtn />
        </Link>
        <AddGuideDisplay
          open={addGuideOpen}
          setOpen={setAddGuideOpen}
          summonerData={summonerData}
          runesData={runeData}
          itemsData={itemData}
        />
      </div>
    </div>
  );
};

export default Guides;
