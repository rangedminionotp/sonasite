import React from "react";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";

const ByRoleMenu = () => {
  const rows: string[] = ["top", "jungle", "mid", "adc", "support", "river"];
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        alert(JSON.stringify(formJson));
      }}
    >
      <Stack spacing={2} alignItems="flex-start">
        <Select
          placeholder="Select which role"
          name="foo"
          required
          sx={{ minWidth: 200 }}
        >
          {rows.map((row) => (
            <Option className="uppercase" value={row.toUpperCase()}>
              {row.toUpperCase()}
            </Option>
          ))}
        </Select>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};

export default ByRoleMenu;
