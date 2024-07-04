import React, { useState } from "react";
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

const TipsSortBtnsMenu = ({ abilityTips, setTipsToUse }) => {
  const votesName = [
    "Date Posted",
    "Total Votes",
    "Popularity",
    "Upvotes",
    "Downvotes",
  ];

  const [sort, setSort] = React.useState("Date Posted");

  const [isDateAsc, setIsDateAsc] = useState(true);
  const [isUpvotesAsc, setIsUpvotesAsc] = useState(true);
  const [isDownvotesAsc, setIsDownvotesAsc] = useState(true);
  const [isPopularityAsc, setIsPopularityAsc] = useState(true);
  const [isVotesAsc, setIsVotesAsc] = useState(true);

  const sortByDate = () => {
    const sorted = [...abilityTips].sort((a, b) => {
      const dateComparison =
        new Date(a.date).getTime() - new Date(b.date).getTime();
      return isDateAsc ? dateComparison : -dateComparison;
    });
    setTipsToUse(sorted);
    setIsDateAsc(!isDateAsc);
  };

  const sortByUpvotes = () => {
    const sorted = [...abilityTips].sort((a, b) => {
      const upvoteComparison = b.upvotes - a.upvotes;
      return isUpvotesAsc ? upvoteComparison : -upvoteComparison;
    });
    setTipsToUse(sorted);
    setIsUpvotesAsc(!isUpvotesAsc);
  };

  const sortByDownvotes = () => {
    const sorted = [...abilityTips].sort((a, b) => {
      const downvoteComparison = b.downvotes - a.downvotes;
      return isDownvotesAsc ? downvoteComparison : -downvoteComparison;
    });
    setTipsToUse(sorted);
    setIsDownvotesAsc(!isDownvotesAsc);
  };

  const sortByPopularity = () => {
    const sorted = [...abilityTips].sort((a, b) => {
      const popularityComparison =
        b.upvotes - b.downvotes - (a.upvotes - a.downvotes);
      return isPopularityAsc ? popularityComparison : -popularityComparison;
    });
    setTipsToUse(sorted);
    setIsPopularityAsc(!isPopularityAsc);
  };

  const sortByTotalVotes = () => {
    const sorted = [...abilityTips].sort((a, b) => {
      const votesComparison =
        b.upvotes - a.upvotes + (b.downvotes - a.downvotes);
      return isVotesAsc ? votesComparison : -votesComparison;
    });
    setTipsToUse(sorted);
    setIsVotesAsc(!isVotesAsc);
  };
  const votesFunc = [
    sortByDate,
    sortByTotalVotes,
    sortByPopularity,
    sortByUpvotes,
    sortByDownvotes,
  ];

  return (
    <div>
      <Dropdown>
        <MenuButton variant="soft" endDecorator={<ArrowDropDown />}>
          Sort Tips By
        </MenuButton>
        <Menu sx={{ minWidth: 160, "--ListItemDecorator-size": "24px" }}>
          <ListItem nested>
            <List aria-label="Font sizes">
              {votesName.map((item: string, index: number) => (
                <MenuItem
                  key={item}
                  role="menuitemradio"
                  aria-checked={item === sort ? "true" : "false"}
                  onClick={() => {
                    votesFunc[index](abilityTips, setTipsToUse);
                    setSort(item);
                  }}
                >
                  <ListItemDecorator>
                    {item === sort && <ArrowRight />}
                  </ListItemDecorator>
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
