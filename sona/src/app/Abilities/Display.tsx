"use client";
import React from "react";
// import images from "../../../assets/abilities";

import Q from "../../../assets/abilities/Hymn_of_Valor.webp";
import W from "../../../assets/abilities/Aria_of_Perseverance.webp";

import E from "../../../assets/abilities/Song_of_Celerity.webp";

import passive from "../../../assets/abilities/Power_Chord.webp";
import R from "../../../assets/abilities/Crescendo.webp";

import Image from "next/image";

const Display = () => {
  // const imageKeys = Object.keys(images);

  {
    /* {imageKeys.map((index, image) => (
        <div>
          <Image
            src={index}
            className="object-cover"
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))} */
  }
  const abilities = [Q, W, E];
  return (
    <div className="flex space-x-6">
      <div name={`passive-icon`} key={`passive-icon`} className="mb-10">
        <Image src={passive} className="object-cover border border-gray-300" />
      </div>
      {abilities.map((index, image) => (
        <div name={`${image}-icon`} key={`${image}-icon`} className="mb-10">
          <Image src={index} className="object-cover border border-gray-300" />
        </div>
      ))}
      <div name={`R-icon`} key={`R-icon`} className="mb-10">
        <Image src={R} className="object-cover border border-gray-300" />
      </div>
    </div>
  );
};

export default Display;