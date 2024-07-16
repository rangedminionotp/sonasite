import React from "react";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Checkbox from "@mui/joy/Checkbox";
import Box from "@mui/joy/Box";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
interface ItemsNavbarProps {
  itemTree: ItemTree[];
}

interface ItemTree {
  header: string;
  tags: string[];
}

const otherTrees = ["epic, legendary"];
const ItemsNavbar = ({ itemTree }: ItemsNavbarProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <div>X Clear</div>
      {itemTree &&
        itemTree.map((item) => {
          return (
            <Box className="items-center gap-2 border border-gray-100 rounded-md p-2">
              <Dropdown>
                <Checkbox
                  label={item.header}
                  className="  font-bold text-gray-200"
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "white",
                  }}
                />{" "}
                <MenuButton
                  variant="neutral"
                  sx={{
                    backgroundColor: "var(--primary-bg)",
                    color: "white",
                  }}
                >
                  <ArrowDropDownCircleIcon />
                </MenuButton>
                <Menu>
                  {item.tags.map((tag) => {
                    return <MenuItem className="lowercase">{tag}</MenuItem>;
                  })}
                </Menu>
              </Dropdown>
            </Box>
          );
        })}
    </div>
  );
};

export default ItemsNavbar;
