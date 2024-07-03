import React from "react";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { getUserFromLocalStorage, createGraphQLClient } from "@/app/utils/api";

import DeleteLore from "./DeleteLore";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import EditLoreModal from "./EditLoreModal";

const UserLoreList = ({ bgColor, open, setOpen, userLores, setUserLores }) => {
  const user = getUserFromLocalStorage();
  const [editLoreBtn, setEditLoreBtn] = React.useState(false);
  const [currLore, setCurrLore] = React.useState(null);
  return (
    <div>
      <React.Fragment>
        <div
          className={
            !open
              ? "hidden"
              : `top-0 left-0 w-full h-screen ${bgColor} bg-opacity-50 absolute`
          }
        >
          <div>
            {userLores.map((lore) => (
              <div key={lore.id}>
                <div>{user.name}</div>
                <div>{lore.lore}</div>
                <div>
                  {format(parseISO(lore.time), "MMMM dd, yyyy h:mm a")} (
                  {formatDistanceToNow(parseISO(lore.time), {
                    addSuffix: true,
                  })}
                  )
                </div>
                <div className="flex justify-center">
                  <div onClick={() => setCurrLore(lore)}>
                    <IconButton onClick={() => setEditLoreBtn(true)}>
                      <EditIcon />
                    </IconButton>
                  </div>

                  {currLore && (
                    <div>
                      <EditLoreModal
                        open={editLoreBtn}
                        setOpen={setEditLoreBtn}
                        lore={currLore}
                        userLores={userLores}
                        setUserLores={setUserLores}
                        setCurrLore={setCurrLore}
                      />
                    </div>
                  )}
                  <DeleteLore
                    lore_id={lore.id}
                    userLores={userLores}
                    setUserLores={setUserLores}
                  />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
      </React.Fragment>
    </div>
  );
};

export default UserLoreList;
