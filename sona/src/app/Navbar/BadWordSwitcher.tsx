import React from "react";
import Switch from "@mui/joy/Switch";
import Typography from "@mui/joy/Typography";
const BadWordSwitcher = () => {
  return (
    <Typography
      component="label"
      className="text-gray-200 text-xl "
      endDecorator={<Switch sx={{ ml: 1 }} />}
    >
      Language Filter
    </Typography>
  );
};

export default BadWordSwitcher;
