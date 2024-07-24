import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SummonersDescription from "./SummonersDescription";

import DeleteIcon from "@mui/icons-material/Delete";
import { StepTwoContext } from "../../types";
import Button from "@mui/joy/Button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/components/ui/hover-card";

const DraggableItem = ({ item, index, onDragStart }) => (
  <div draggable onDragStart={(e) => onDragStart(e, index)}>
    {item}
  </div>
);

const DropArea = ({ onDrop, onDragOver, children, id }) => (
  <div
    onDrop={(e) => onDrop(e, id)}
    onDragOver={onDragOver}
    style={{
      minWidth: "50px",
      minHeight: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "2px dashed #ccc",
    }}
  >
    {children}
  </div>
);

const SummonersList = ({ summonerData }) => {
  const [addPair, setAddPair] = useState(false);
  const [draggingItem, setDraggingItem] = useState({ item: null, id: null });
  const [droppedItems, setDroppedItems] = useState({
    D: null,
    DId: null,
    F: null,
    FId: null,
  });
  const [description, setDescription] = useState("");
  const [pairs, setPairs] = useState([]);
  const StepTwoCtx = useContext(StepTwoContext);

  const handleDragStart = (e, index) => {
    setDraggingItem({
      item: (
        <Image
          className="hover:cursor-pointer"
          src={summonerData[index].imageURL}
          alt={summonerData[index].name}
          width={50}
          height={50}
        />
      ),
      id: summonerData[index].id,
    });
  };

  const handleDrop = (e, dropAreaId) => {
    e.preventDefault();
    if (draggingItem !== null) {
      setDroppedItems((prevItems) => ({
        ...prevItems,
        [dropAreaId]: draggingItem.item,
        [dropAreaId + "Id"]: draggingItem.id,
      }));
      setDraggingItem(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClearDropArea = (area) => {
    setDroppedItems((prevItems) => ({
      ...prevItems,
      [area]: null,
      [area + "Id"]: null,
    }));
  };

  const handleAddPair = (e) => {
    setPairs((prevPairs) => [
      ...prevPairs,
      {
        D: droppedItems.D,
        DId: droppedItems.DId,
        F: droppedItems.F,
        FId: droppedItems.FId,
        description: description,
      },
    ]);
    setDroppedItems({ D: null, F: null, DId: null, FId: null });
    setDescription("");
    setAddPair(false);

    const newPairs = {
      summonerOne: {
        summonerImg: droppedItems.D,
        summonerId: droppedItems.DId,
      },
      summonerTwo: {
        summonerImg: droppedItems.F,
        summonerId: droppedItems.FId,
      },
      description: description,
    };
    if (pairs.length > 0) {
      StepTwoCtx.setSummonerPairs((prevPairs) => [...prevPairs, newPairs]);
    } else {
      StepTwoCtx.setSummonerPairs([newPairs]);
    }
  };

  const handleAdd = (summoner) => {
    setDroppedItems((prevItems) => {
      const updatedItems = { ...prevItems }; // Create a shallow copy of prevItems

      if (prevItems.D === null) {
        updatedItems.D = (
          <Image
            src={summoner.imageURL}
            alt={summoner.name}
            width={50}
            height={50}
          />
        );
        updatedItems.DId = summoner.id;
      } else if (prevItems.F === null) {
        updatedItems.F = (
          <Image
            src={summoner.imageURL}
            alt={summoner.name}
            width={50}
            height={50}
          />
        );
        updatedItems.FId = summoner.id;
      }

      return updatedItems; // Return the updated object
    });
  };

  const handleDeletePair = (index) => {
    setPairs((prevPairs) => prevPairs.filter((_, i) => i !== index));
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
              <div>
                <HoverCard>
                  <HoverCardTrigger>
                    <DraggableItem
                      key={index}
                      item={
                        <Image
                          src={summoner.imageURL}
                          alt={summoner.name}
                          width={50}
                          height={50}
                          className="hover:cursor-pointer"
                          onClick={() => handleAdd(summoner)}
                        />
                      }
                      index={index}
                      onDragStart={handleDragStart}
                    />
                    <h1 className="text-gray-200 uppercase font-work-sans">
                      {summoner.name}
                    </h1>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div>
                      <div className="flex items-center gap-2">
                        <Image
                          src={summoner.imageURL}
                          alt={summoner.name}
                          width={50}
                          height={50}
                          className="hover:cursor-grab"
                          onClick
                        />
                        <h1 className="text-gray-200 uppercase font-work-sans">
                          {summoner.name}
                        </h1>
                      </div>
                      <div className="text-[#CDBD82] font-semibold text-xl">
                        {summoner.cooldown}s
                      </div>
                      <div className="text-gray-200 text-base font-sans">
                        {summoner.description}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              // </Tooltip>
            ))}
        </div>
        {StepTwoCtx.summonerPairs.map((pair, index) => (
          <div
            key={index}
            className="p-4 flex justify-between border backdrop-blur-lg bg-white/30 border-gray-800 shadow-md mb-4"
          >
            <div>
              {pair.summonerOne.summonerImg} {pair.summonerTwo.summonerImg}
            </div>
            <div className="text-md text-gray-700">{pair.description}</div>
            <div className="hover:cursor-pointer justify-end">
              <DeleteIcon onClick={() => handleDeletePair(index)} />
            </div>
          </div>
        ))}
        <div>
          <IconButton
            onClick={() => setAddPair(!addPair)}
            className="text-gray-200 p-4 rounded-lg hover:cursor-pointer"
          >
            <AddIcon className="text-gray-200 hover:scale-120" />
          </IconButton>
        </div>
        {addPair && (
          <div className="flex gap-2 mt-4">
            <div
              onClick={() => handleClearDropArea("D")}
              className="hover:cursor-pointerw-16 h-16 bg-gray-200 p-2 rounded-lg border-2 border-gray-800 shadow-lg flex text-center justify-center items-center relative"
            >
              <DropArea onDrop={handleDrop} onDragOver={handleDragOver} id="D">
                {!droppedItems.D ? "D" : droppedItems.D}
              </DropArea>
            </div>
            <div
              className="hover:cursor-pointer w-16 h-16 bg-gray-200 p-2 rounded-lg border-2 border-gray-800 shadow-lg flex text-center justify-center items-center relative"
              onClick={() => handleClearDropArea("F")}
            >
              <DropArea onDrop={handleDrop} onDragOver={handleDragOver} id="F">
                {!droppedItems.F ? "F" : droppedItems.F}
              </DropArea>
            </div>
            <SummonersDescription
              description={description}
              setDescription={setDescription}
            />
            <Button
              onClick={handleAddPair}
              disabled={!droppedItems.D || !droppedItems.F}
            >
              Add
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummonersList;
