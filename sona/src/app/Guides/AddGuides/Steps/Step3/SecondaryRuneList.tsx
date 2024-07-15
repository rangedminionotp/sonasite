import React from "react";
import Image from "next/image";

const SecondaryRuneList = ({ secondaryRune }) => {
  return secondaryRune ? (
    <div>
      <div className="text-lg font-semibold">{secondaryRune.name}</div>
      <div className="grid grid-cols-3 gap-4">
        {secondaryRune.slots.map((slot) => (
          <div key={slot.id}>
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
  ) : null;
};

export default SecondaryRuneList;
