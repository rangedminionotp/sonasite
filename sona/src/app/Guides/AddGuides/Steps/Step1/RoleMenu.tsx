import React, { useState } from "react";
import Image from "next/image";

interface GuideRolesType {
  id: string;
  role: string;
  img?: string | null;
}

const RoleMenu = ({ selectedRoles, setSelectedRoles }) => {
  const [roles, setRoles] = React.useState<GuideRolesType[]>([]);

  const handleSelect = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles((prevRoles) => [...prevRoles, role]);
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
    <div className="w-full">
      <div className="description-subheader text-gray-200">Select Roles</div>
      <div className="grid grid-cols-7 max-w-full gap-4">
        {roles.map((role) => (
          <div
            className="justify-center items-center text-center"
            onClick={() => handleSelect(role.role)}
          >
            <div
              className={`flex items-center justify-center w-28 h-28 rounded-full bg-gray-700 mx-auto ${
                selectedRoles.includes(role.role)
                  ? "border-2 border-blue-500"
                  : ""
              }`}
            >
              <Image
                src={role.data.imgurl}
                alt={role.role}
                width={70}
                height={70}
              />
            </div>
            <div className=" role-item-name ">{role.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleMenu;
