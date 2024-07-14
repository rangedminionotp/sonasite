import React, { useState } from "react";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

const DraggableItem = ({ item, index, onDragStart }) => (
  <div draggable onDragStart={(e) => onDragStart(e, index)}>
    {item}
  </div>
);

const DropArea = ({ onDrop, onDragOver, children }) => (
  <div onDrop={onDrop} onDragOver={onDragOver}>
    {children}
  </div>
);

const SummonersList = ({ summonerData }) => {
  const [summonerPair, setSummonerPair] = useState(null);
  const [addPair, setAddPair] = useState(false);
  const [firstSummoner, setFirstSummoner] = useState(null);
  const [secondSummoner, setSecondSummoner] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggingItem(
      <Image
        src={`${summonerData[index].imageURL}`}
        alt={summonerData[index].name}
        width={50}
        height={50}
      />
    );
    console.log("something", summonerData[index].imageURL);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggingItem !== null) {
      setDroppedItems([...droppedItems, draggingItem]);
      setDraggingItem(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container mx-auto w-full">
      <div className="p-2">
        <div className="steps-description-header text-gray-200">
          5. Select Summoners
        </div>
        <div className="grid grid-cols-7 max-w-full gap-4">
          {summonerData &&
            summonerData.map((summoner, index) => (
              <Tooltip title={summoner.description} key={summoner.id + index}>
                <div draggable>
                  <h1 className="text-gray-200">{summoner.name}</h1>
                  <h1 className="text-gray-200">{summoner.cooldown}</h1>
                  <DraggableItem
                    key={index}
                    item={
                      <Image
                        src={`${summoner.imageURL}`}
                        alt={summoner.name}
                        width={50}
                        height={50}
                      />
                    }
                    index={index}
                    onDragStart={handleDragStart}
                  />
                </div>
              </Tooltip>
            ))}
        </div>
        <DropArea onDrop={handleDrop} onDragOver={handleDragOver}>
          <h3>Drop Area</h3>
          {droppedItems.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "8px",
                margin: "4px",
                backgroundColor: "#e0e0e0",
              }}
            >
              {item}
            </div>
          ))}
        </DropArea>
        <div
          onClick={() => setAddPair(!addPair)}
          className=" text-gray-200 p-4 rounded-lg hover:cursor-pointer"
        >
          <AddIcon className="text-gray-200 hover:scale-120" />
        </div>
        {addPair && (
          <div className="flex gap-2">
            <div className="w-16 h-16 bg-gray-200 p-2 rounded-lg border-2 border-gray-800 shadow-lg flex text-center justify-center items-center ">
              D
            </div>
            <div className="w-16 h-16 bg-gray-200 p-2 rounded-lg border-2 border-gray-800 shadow-lg flex text-center justify-center items-center ">
              F
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummonersList;
