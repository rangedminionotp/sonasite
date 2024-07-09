import React from "react";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
const BadWordSwitcher = ({ BadWordSwitcherBool, setBadWordSwitcherBool }) => {
  return (
    <Typography
      component="label"
      className="text-gray-200 text-lg "
      endDecorator={
        <Switch
          checked={BadWordSwitcherBool}
          onChange={() => {
            setBadWordSwitcherBool(!BadWordSwitcherBool);
            localStorage.setItem("badWord", !BadWordSwitcherBool);
          }}
          sx={{ ml: 1 }}
        />
      }
    >
      Language Filter
    </Typography>
  );
};

export default BadWordSwitcher;
