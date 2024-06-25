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
});

export default function SkinItemRating({ rating, readOnlyBoolean }) {
  const { setAddReviewsRating } = React.useContext(SkinContext);
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
          onChange={
            !readOnlyBoolean
              ? (event, newValue) => {
                  setAddReviewsRating(newValue);
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
