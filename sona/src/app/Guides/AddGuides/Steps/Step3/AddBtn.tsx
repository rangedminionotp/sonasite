import { Button } from "@mui/material";

export const AddBtn = ({
  addRunes,
  setAddRunes,
}: {
  addRunes: boolean;
  setAddRunes: (value: boolean) => void;
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => setAddRunes(!addRunes)}
    >
      Add Runes
    </Button>
  );
};
