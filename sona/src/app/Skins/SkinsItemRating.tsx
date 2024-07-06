import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import SkinContext from "./SharedContext";
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconEmpty": {
    color: "#d4d4d8",
  },
});

export default function SkinItemRating({
  setRating,
  rating,
  readOnlyBoolean,
  // setEditReviewOpen,
}) {
  const handleChange = (event, newValue) => {
    if (newValue !== null && newValue !== rating) {
      setRating(newValue);
    }
  };

  // const handleClick = () => {
  //   setEditReviewOpen(true);
  // };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <div>
        <StyledRating
          defaultValue={rating}
          getLabelText={(value: number) =>
            `${value} Heart${value !== 1 ? "s" : ""}`
          }
          // onClick={!readOnlyBoolean ? handleClick : null}
          onChange={
            !readOnlyBoolean
              ? (event, newValue) => {
                  setRating(newValue);
                }
              : null
          }
          readOnly={readOnlyBoolean}
          precision={0.1}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
      </div>
    </Box>
  );
}
