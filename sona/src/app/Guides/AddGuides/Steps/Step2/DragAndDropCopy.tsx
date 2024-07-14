import React, { useState } from "react";

const DraggableItem = ({ item, index, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, index)}
    className="draggable-item"
    style={{
      padding: "8px",
      margin: "4px",
      backgroundColor: "#ddd",
      border: "1px solid #ccc",
      cursor: "move",
    }}
  >
    {item}
  </div>
);

const DropArea = ({ onDrop, onDragOver, children }) => (
  <div
    onDrop={onDrop}
    onDragOver={onDragOver}
    className="drop-area"
    style={{
      minHeight: "100px",
      padding: "8px",
      margin: "4px",
      backgroundColor: "#f9f9f9",
      border: "2px dashed #ccc",
    }}
  >
    {children}
  </div>
);

const DragAndDropCopy = () => {
  const [items] = useState(["Item 1", "Item 2", "Item 3"]);
  const [droppedItems, setDroppedItems] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggingItem(items[index]);
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
    <div className="drag-and-drop-container" style={{ display: "flex" }}>
      <div className="draggable-items" style={{ marginRight: "16px" }}>
        <h3>Draggable Items</h3>
        {items.map((item, index) => (
          <DraggableItem
            key={index}
            item={item}
            index={index}
            onDragStart={handleDragStart}
          />
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
    </div>
  );
};

export default DragAndDropCopy;
