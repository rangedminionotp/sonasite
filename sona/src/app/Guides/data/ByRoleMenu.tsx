import React from "react";
import Button from "@mui/joy/Button";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Stack from "@mui/joy/Stack";

interface GuideRolesType {
  id: string;
  role: string;
}

const ByRoleMenu = () => {
  const [roles, setRoles] = React.useState<GuideRolesType[]>([]);
  const [selectedRole, setSelectedRole] = React.useState<string>("");

  React.useEffect(() => {
    const query = {
      query: `
      query {
        getGuidesRoles {
          id
          role
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
          console.log("Error with guide roles, please try again");
        } else {
          setRoles(json.data.getGuidesRoles);
        }
      })
      .catch((error) => {
        console.error("Error fetching guide roles:", error);
        console.log("Failed to fetch guide roles. Please try again.");
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
          placeholder="Select which role"
          name="role"
          required
          sx={{ minWidth: 200 }}
        >
          {roles.map((role) => (
            <Option className="uppercase" value={role.role}>
              {role.role.toUpperCase()}
            </Option>
          ))}
        </Select>
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
};

export default ByRoleMenu;
