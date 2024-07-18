import React, { useState } from "react";

const ItemsCategoryTopBar = ({ setCategory, category }) => {
  const topbarLabels = [
    "All Items",
    "Fighter",
    "Mage",
    "Assassin",
    "Support",
    "Tank",
    "Marksman",
  ];

  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    console.log(search);
  };

  //   const topbarIcons = [
  //     <svg viewBox="0 0 28 28" fill="none">
  //       <rect x="4.5" y="4.5" width="5" height="5"></rect>
  //       <rect x="4.5" y="11.5" width="5" height="5"></rect>
  //       <rect x="4.5" y="18.5" width="5" height="5"></rect>
  //       <rect x="11.5" y="4.5" width="5" height="5"></rect>
  //       <rect x="11.5" y="11.5" width="5" height="5"></rect>
  //       <rect x="11.5" y="18.5" width="5" height="5"></rect>
  //       <rect x="18.5" y="4.5" width="5" height="5"></rect>
  //       <rect x="18.5" y="11.5" width="5" height="5"></rect>
  //       <rect x="18.5" y="18.5" width="5" height="5"></rect>
  //     </svg>,
  //     <svg viewBox="0 0 28 28" fill="none">
  //       <path d="M12 22.6713C8.80002 19.0713 11.8333 15.8379 13.5 14.6713L18 24.1713L20.5 23.1713L15.5 13.1713C18.7 11.5713 20.8333 14.8379 21.5 16.6713C22.6667 16.0046 24.7 13.3713 23.5 8.17132C22.3 2.97132 17 2.67132 14.5 3.17132C19.3 6.37132 16.1667 9.17132 14 10.1713L12.5 7.67132L10.5 8.67132L12 11.6713C8.00004 12.4713 6.66667 8.67132 6.49999 6.67132C0.49999 17.0713 7.66668 21.6713 12 22.6713Z"></path>
  //     </svg>,
  //     <svg viewBox="0 0 28 28" fill="none">
  //       <path
  //         fill-rule="evenodd"
  //         clip-rule="evenodd"
  //         d="M20.875 4.83337L14.4584 8.15629V19.3855L20.875 16.6355V9.98962L22.4906 9.18754V18.1136L14 21.5625L5.75002 18.1136V9.18754L7.12502 9.98962V16.6355L13.5417 19.3855V8.15629L7.12502 4.83337V7.69796L3.91669 5.86462V19.6146L14 23.625L24.0834 19.6146V5.86462L20.875 7.69796V4.83337Z"
  //       ></path>
  //     </svg>,
  //     <svg viewBox="0 0 28 28" fill="none">
  //       <path
  //         fill-rule="evenodd"
  //         clip-rule="evenodd"
  //         d="M20.875 4.83337L14.4584 8.15629V19.3855L20.875 16.6355V9.98962L22.4906 9.18754V18.1136L14 21.5625L5.75002 18.1136V9.18754L7.12502 9.98962V16.6355L13.5417 19.3855V8.15629L7.12502 4.83337V7.69796L3.91669 5.86462V19.6146L14 23.625L24.0834 19.6146V5.86462L20.875 7.69796V4.83337Z"
  //       ></path>
  //     </svg>,
  //     <svg viewBox="0 0 28 28" fill="none">
  //       <path d="M8.5 17.5C10.5 12.5 13.3333 11 14.5 9.5L17.5 12.5L13.5 15.5C14.5 16.5 16.8841 16.3333 18 16C11.6 24 4.83333 23.1667 2.5 21.5C4 21.1667 7.42875 20.1781 8.5 17.5Z"></path>
  //       <path d="M24.5 5L21.5 2L17.5 6.5L14.5 5L13 6L21.5 11.5L22.5 10.5L19 7.5L24.5 5Z"></path>
  //     </svg>,
  //     <svg viewBox="0 0 28 28" fill="none">
  //       <path
  //         fill-rule="evenodd"
  //         clip-rule="evenodd"
  //         d="M16.6516 4.08337H11.3485L10.4205 5.32296L14 9.73037L17.5796 5.32296L16.6516 4.08337ZM9.75756 8.35302H2.33331C3.35472 9.35415 4.53327 10.2964 5.78028 10.9699C6.28041 11.1316 6.71467 11.2438 7.23862 11.2454H9.22725L7.10604 13.8623L10.553 15.5151L11.8788 10.5567L9.75756 8.35302ZM18.2423 8.35302H25.6666C24.6449 9.35281 23.4664 10.2975 22.2196 10.9699C21.7195 11.1316 21.2852 11.2438 20.7613 11.2454H18.7726L20.8938 13.8623L17.4469 15.5151L16.1211 10.5567L18.2423 8.35302ZM16.7839 21.713L14.6627 10.6945C14.5722 11.0076 14.3139 11.2147 13.9999 11.2454C13.6872 11.2132 13.4269 11.0064 13.337 10.6945L11.2158 21.713L13.9999 23.9167L16.7839 21.713Z"
  //       ></path>
  //     </svg>,
  //     <svg viewBox="0 0 28 28" fill="none">
  //       <path d="M14.5 23C9.7 19 7.5 10.6667 7 7C10.2 6.2 13 4 14 3L14.5 16L15.5 4C16.7 5.6 20 6.66667 21.5 7C22.3 12.6 17.1667 20 14.5 23Z"></path>
  //     </svg>,
  //     <svg viewBox="0 0 28 28" fill="none">
  //       <path
  //         fill-rule="evenodd"
  //         clip-rule="evenodd"
  //         d="M15 20.1826L2.5 16.6827L11.5 7.18266C10.7 5.98266 8.16667 5.34929 7 5.1826C13.5 4.18262 16.8333 7.51594 18.5 9.6826H19.5V8.1826L26 9.1826L21 13.6826L20.5 12.1826L19 13.1826C20.2 19.5826 15.8333 22.8493 13.5 23.6826L15 20.1826ZM16 11.1826C15.6 9.18262 13.5 8.01595 12.5 7.68262L6 14.6826L16 11.1826ZM7 16.1826L17 13.6826C17.1667 15.016 17.2 17.9826 16 19.1826L7 16.1826Z"
  //       ></path>
  //     </svg>,
  //   ];
  return (
    <div className="flex items-center justify-center gap-2">
      {/* search component */}

      <div className="flex items-center justify-center gap-2"></div>

      {/* topbar labels */}
      {topbarLabels.map((label, index) => (
        <div
          onClick={() => {
            setCategory(label.toLowerCase());
          }}
          key={index}
          className={`cursor-pointer text-[#f4f3f0]/80  text-2xl px-5 hover:text-[#f4f3f0] font-sans  ${
            category === label.toLowerCase() ? "bg-[#888888]" : ""
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default ItemsCategoryTopBar;
