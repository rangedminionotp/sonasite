import React, { useState } from "react";
import Image from "next/image";

interface GuideRolesType {
  id: string;
  role: string;
  img?: string | null;
}

const RoleMenu = () => {
  const [roles, setRoles] = React.useState<GuideRolesType[]>([]);
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);

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
    <div>
      {roles.map((role) => (
        <div className="uppercase">
          <Image
            src={role.data.imgurl}
            alt={role.role}
            width={50}
            height={50}
          />
          {role.role.toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default RoleMenu;
