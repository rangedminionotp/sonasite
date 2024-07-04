import React from "react";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/joy/IconButton";

const TipsSearch = ({
  search,
  setSearch,
  setSearchTips,
  searchTips,
  ability_id,
}) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    if (!value) {
      setSearchTips(null);
    }
  };

  const handleSearch = () => {
    const query = {
      query: `query MyQuery {
  searchAbilityTips(search: "${search}", ability_id: "${ability_id}") {
    ability_id
    date
    description
    downvotes
    edited
    ownerId
    ownerName
    tip_id
    version
    upvotes
  }
}`,
    };
    fetch("/api/graphql", {
      method: "POST",
      body: JSON.stringify(query),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.errors) {
          console.log("Error searching tips, please try again");
        } else {
          console.log(json.data.searchAbilityTips);
          setSearchTips(json.data.searchAbilityTips);
        }
      });
  };

  return (
    <div className="flex items-center">
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
        className="flex items-center"
      >
        <Input
          placeholder="Search"
          defaultValue={search}
          onChange={handleChange}
        />
        <div className={`${search ? "cursor-pointer" : "cursor-not-allowed"}`}>
          <IconButton disabled={!search} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default TipsSearch;
