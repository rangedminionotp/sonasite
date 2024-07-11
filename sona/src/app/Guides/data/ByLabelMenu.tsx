import React from "react";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";

interface GuideLabelsType {
  id: string;
  role_id: string;
  label: string;
}

const ByLabelMenu = () => {
  const [labels, setLabels] = React.useState<GuideLabelsType[]>([]);
  const [selectedLabel, setSelectedLabel] = React.useState<string>("");

  React.useEffect(() => {
    const query = {
      query: `
      query {
        getGuidesLabels {
          id
          role_id
          label
        }
      }
    `,
    };
    fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.errors) {
          console.log("Error with guide labels, please try again");
        } else {
          setLabels(json.data.getGuidesLabels);
        }
      })
      .catch((error) => {
        console.error("Error fetching guide labels:", error);
        console.log("Failed to fetch guide labels. Please try again.");
      });
  }, []);
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
          placeholder="Select a label"
          name="label"
          required
          sx={{ minWidth: 200 }}
        >
          {labels.map((label) => (
            <Option className="uppercase" value={label.label}>
              {label.label.toUpperCase()}
            </Option>
          ))}
        </Select>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};

export default ByLabelMenu;
