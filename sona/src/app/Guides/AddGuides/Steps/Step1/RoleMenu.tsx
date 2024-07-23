import React, { useState } from "react";
import Image from "next/image";
interface GuideRolesType {
  id: string;
  role: string;
  img?: string | null;
}

const RoleMenu = ({
  selectedRoles,
  setSelectedRoles,
}: {
  selectedRoles: string[];
  setSelectedRoles: (roles: string[]) => void;
}) => {
  const [roles, setRoles] = React.useState<GuideRolesType[]>([]);

  const handleSelect = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  React.useEffect(() => {
    const query = {
      query: `
      query {
        getGuidesRoles {
          id
          role
          data {
            imgurl
          }
        }
      }
    `,
    };
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          console.log("Error with guide roles, please try again");
        } else {
          setRoles(json.data.getGuidesRoles);
        }
      })
      .catch((error) => {
        console.error("Error fetching guide roles:", error);
        console.log("Failed to fetch guide roles. Please try again.");
      });
  }, []);
  return (
    <div className="w-full container mx-auto ">
      <div className="p-2">
        <div className="steps-description-header text-gray-200">
          3. Select Roles
        </div>
        <div className="grid grid-cols-7 max-w-full gap-4">
          {roles.map((role) => (
            <div
              className="justify-center items-center text-center"
              onClick={() => handleSelect(role.role)}
            >
              <div
                className={`flex items-center justify-center w-20 h-20 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-full role-item mx-auto ${
                  selectedRoles.includes(role.role)
                    ? "border-2 border-blue-500"
                    : ""
                }`}
              >
                <Image
                  src={role.data.imgurl}
                  alt={role.role}
                  width={40}
                  height={40}
                  className="drop-shadow-lg object-cover rounded-full w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-12 xl:h-12"
                />
              </div>
              <div className=" role-item-name ">{role.role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleMenu;
