import React from "react";
import { createGraphQLClient } from "@/app/utils/api";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import { SkinLore } from "@/SkinLore/schema";
import { gql } from "graphql-request";
import UserLoreList from "./UserLoreList";
import { useRouter } from "next/navigation";
import { badWordFilter } from "@/app/utils/badWordFilter";
import { useUser } from "@/app/utils/user";
import VisibilityIcon from "@mui/icons-material/Visibility";
const ViewCustomLore = ({
  skin_id,
  bgColor,
  skinName,
  setAddLoreOpen,
  userLores,
  setUserLores,
}) => {
  const user = useUser();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    const bearerToken = user?.accessToken;
    const graphQLClient = createGraphQLClient(bearerToken);
    try {
      const badWordBool = localStorage.getItem("badWord");

      const query = gql`
      query MyQuery {
  getLoreByUserId(owner_id: "${user.id}", skin_id: "${skin_id}") {
    id
    lore
    owner_id
    skin_id
    time
  }
}
      `;
      const response = await graphQLClient.request(query);
      const lores = response.getLoreByUserId;
      if (badWordBool === "true") {
        const filteredLores = await badWordFilter(lores, "skinLores");
        setUserLores(filteredLores);
      } else {
        setUserLores(lores);
      }
      setOpen(true);
    } catch (error) {
      console.log("Error fetching user lores", error);
    }
  };

  // React.useEffect(() => {}, [skin_id]);

  return (
    <div>
      {user ? (
        <div>
          <Tooltip title="View your lores">
            <IconButton onClick={handleClick}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <UserLoreList
            bgColor={bgColor}
            open={open}
            setOpen={setOpen}
            userLores={userLores}
            setUserLores={setUserLores}
            skinName={skinName}
            setAddLoreOpen={setAddLoreOpen}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ViewCustomLore;
