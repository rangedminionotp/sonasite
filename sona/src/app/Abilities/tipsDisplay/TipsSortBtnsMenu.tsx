import * as React from "react";
import MenuButton from "@mui/joy/MenuButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowRight from "@mui/icons-material/ArrowRight";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Dropdown from "@mui/joy/Dropdown";

const TipsSortBtnsMenu = ({
  sortByDate,
  sortByTotalVotes,
  sortByPopularity,
  sortByUpvotes,
  sortByDownvotes,
}) => {
  const votesName = [
    "Date Posted",
    "Total Votes",
    "Popularity",
    "Upvotes",
    "Downvotes",
  ];
  const votesFunc = [
    sortByDate,
    sortByTotalVotes,
    sortByPopularity,
    sortByUpvotes,
    sortByDownvotes,
  ];
  const [sort, setSort] = React.useState("Date Posted");

  return (
    <div>
      <Dropdown>
        <MenuButton endDecorator={<ArrowDropDown />}>Sort Tips By</MenuButton>
        <Menu sx={{ minWidth: 160, "--ListItemDecorator-size": "24px" }}>
          <ListItem nested>
            <List aria-label="Font sizes">
              {votesName.map((item: string, index: number) => (
                <MenuItem
                  key={item}
                  role="menuitemradio"
                  aria-checked={item === sort ? "true" : "false"}
                  onClick={() => {
                    votesFunc[index]();
                    setSort(item);
                  }}
                >
                  <ListItemDecorator>
                    {item === sort && <ArrowRight />}
                  </ListItemDecorator>{" "}
                  {item}
                </MenuItem>
              ))}
            </List>
          </ListItem>
        </Menu>
      </Dropdown>
    </div>
  );
};

export default TipsSortBtnsMenu;
