import React, { useState } from "react";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Checkbox from "@mui/joy/Checkbox";
import Box from "@mui/joy/Box";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/joy/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

interface ItemsNavbarProps {
  itemTree: ItemTree[];
  selectedCategories: string[] | null;
  setSelectedCategories: (categories: string[]) => void;
}

interface ItemTree {
  header: string;
  tags: string[];
}

const otherTrees = ["epic", "legendary"];

const ItemsNavbar = ({
  itemTree,
  selectedCategories,
  setSelectedCategories,
}: ItemsNavbarProps) => {
  const handleCategorySelect = (category: string) => {
    if (selectedCategories === null) {
      setSelectedCategories([category.toLowerCase()]);
    } else if (selectedCategories.includes(category.toLowerCase())) {
      setSelectedCategories((prev) =>
        prev.filter((c) => c !== category.toLowerCase())
      );
    } else {
      setSelectedCategories((prev) => [...prev, category.toLowerCase()]);
    }
  };

  const ItemCategoryComponent = ({ item }: { item: ItemTree }) => {
    return (
      <Box className="items-center gap-2 border border-gray-100 rounded-md p-2">
        <Dropdown>
          <Checkbox
            label={item.header}
            className="  font-bold text-gray-200 hover:scale-x-110 uppercase"
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              color: "white",
            }}
            checked={
              selectedCategories === null
                ? false
                : selectedCategories.includes(item.header)
            }
            onChange={() => handleCategorySelect(item.header)}
          />
          <MenuButton
            variant="neutral"
            sx={{
              backgroundColor: "var(--primary-bg)",
              color: "white",
            }}
          >
            <ArrowDropDownCircleIcon className="hover:scale-x-110" />
          </MenuButton>
          <Menu>
            {item.tags.map((tag) => {
              return (
                <MenuItem onClick={() => handleCategorySelect(tag)}>
                  {tag}
                </MenuItem>
              );
            })}
          </Menu>
        </Dropdown>
      </Box>
    );
  };

  const OtherCategoryComponent = ({ category }: { category: string }) => {
    return (
      <Box
        className="items-center gap-2 border border-gray-100 rounded-md p-2"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Centers horizontally as well
        }}
      >
        <Checkbox
          label={category}
          className="  font-bold text-gray-200 hover:scale-x-110 uppercase"
          sx={{
            fontSize: "14px",
            fontWeight: "600",
            color: "white",
          }}
          checked={
            selectedCategories === null
              ? false
              : selectedCategories.includes(category)
          }
          onChange={() => handleCategorySelect(category)}
        />
      </Box>
    );
  };

  const Search = () => {
    return (
      <div className="flex items-center">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
          className="flex items-center"
        >
          <Input
            placeholder="Search item..."
            defaultValue="hi"
            endDecorator={
              <IconButton>
                <ClearIcon className="cursor-pointer" />
              </IconButton>
            }
          />
          <div>
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-2">
      <div>X Clear</div>
      {itemTree &&
        itemTree.map((item) => {
          return <ItemCategoryComponent item={item} />;
        })}
      {otherTrees.map((category) => {
        return <OtherCategoryComponent category={category} />;
      })}
      <div>
        {selectedCategories &&
          selectedCategories.map((category) => {
            return <div>{category}</div>;
          })}
      </div>
      <Search />
    </div>
  );
};

export default ItemsNavbar;
