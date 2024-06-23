import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
});

export default function SkinItemRating({ rating, readOnlyBoolean }) {
  const [value, setValue] = React.useState(0);
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <div>
        <StyledRating
          name="customized-color"
          defaultValue={rating}
          getLabelText={(value: number) =>
            `${value} Heart${value !== 1 ? "s" : ""}`
          }
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          readOnly={readOnlyBoolean}
          precision={0.1}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
      </div>
    </Box>
  );
}
