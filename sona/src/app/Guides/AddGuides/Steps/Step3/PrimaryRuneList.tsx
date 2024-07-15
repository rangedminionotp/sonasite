import React from "react";
import Image from "next/image";

const PrimaryRuneList = ({ primaryRune }) => {
  return (
    <div>
      <div className="text-lg font-semibold">{primaryRune.name}</div>
      <div className="grid grid-cols-3 gap-4">
        {primaryRune.slots.map((slot) => (
          <div key={slot.id}>
            <div className="grid grid-cols-3 gap-4">
              {slot.keystone.map((keystone) => (
                <div key={keystone.id}>
                  <Image
                    src={keystone.icon}
                    alt={keystone.name}
                    width={50}
                    height={50}
                    className="hover:scale-110 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {slot.normalRunes.map((normalRune) => (
                <div key={normalRune.id}>
                  <Image
                    src={normalRune.icon}
                    alt={normalRune.name}
                    width={30}
                    height={30}
                    className="hover:scale-110 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrimaryRuneList;
