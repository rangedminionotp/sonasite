import React, { useEffect } from "react";
import AddCustomLabel from "./AddCustomLabel";
import { uuid } from "@/app/types/custom";
import { useUser } from "@/app/utils/user";
import { createGraphQLClient } from "@/app/utils/api";
import { gql } from "graphql-request";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
interface GuideLabelsType {
  id: uuid;
  label: string;
}

interface GuideCustomLabelsType {
  id: uuid;
  label: string;
  owner_id: uuid;
}

const LabelsMenu = ({
  selectedLabels,
  setSelectedLabels,
}: {
  selectedLabels: GuideLabelsType[];
  setSelectedLabels: React.Dispatch<React.SetStateAction<GuideLabelsType[]>>;
}) => {
  const [labels, setLabels] = React.useState<GuideLabelsType[]>([]);
  const [customLabels, setCustomLabels] = React.useState<
    GuideCustomLabelsType[]
  >([]);

  const [label, setLabel] = React.useState("");
  const [editbtn, setEditbtn] = React.useState(false);

  const user = useUser();
  const bearerToken = user?.accessToken;
  const graphQLClient = createGraphQLClient(bearerToken);

  const handleSelect = (label: string) => {
    if (selectedLabels.length >= 8) {
      return;
    }
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels((prevLabels) => [...prevLabels, label]);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const removeLabel = gql`
        mutation MyMutation {
          deleteCustomGuideLabel(labelId: "${id}") {
            id
            label
            owner_id
          }
        }
      `;
      const response = await graphQLClient.request(removeLabel);
      setLabel(response.deleteCustomGuideLabel);
      setCustomLabels(customLabels.filter((label) => label.id !== id));
    } catch (error) {
      console.error("Error deleting custom label:", error);
      console.log("Failed to delete custom label. Please try again.");
    }
  };

  const handleEdit = async (id: string, label: string) => {
    try {
      const mutation = gql`
        mutation MyMutation {
          updateCustomGuideLabel(label: "${label}", labelId: "${id}") {
            id
            label
            owner_id
          }
        }
      `;
      const response = await graphQLClient.request(mutation);
      setLabel(response.updateCustomGuideLabel);
      setCustomLabels(
        customLabels.map((label) =>
          label.id === id ? response.updateCustomGuideLabel : label
        )
      );
    } catch (error) {
      console.error("Error editing custom label:", error);
      console.log("Failed to edit custom label. Please try again.");
    }
  };

  React.useEffect(() => {
    const query = {
      query: `
      query {
        getGuidesLabels {
          id 
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

  useEffect(() => {
    const fetchCustomLabels = async () => {
      try {
        const query = gql`
          query {
            getGuidesCustomLabels {
              id
              label
              owner_id
            }
          }
        `;
        const response = await graphQLClient.request(query);
        setCustomLabels(response.getGuidesCustomLabels);
      } catch (error) {
        console.error("Error fetching custom guide labels:", error);
        console.log("Failed to fetch custom guide labels. Please try again.");
      }
    };

    fetchCustomLabels();
  }, [label]);
  return (
    <div className="container mx-auto  w-full">
      <div className="p-2">
        <div className="steps-description-header text-gray-200">
          4. Select Labels (max 8)
        </div>
        <div className="grid grid-cols-7 max-w-full gap-4">
          {labels.map((label) => (
            <div
              className="justify-center items-center text-center"
              key={label.id}
              onClick={() => handleSelect(label.label)}
            >
              <div
                className={`flex items-center justify-center w-28 h-28 rounded-[50%] label-item mx-auto ${
                  selectedLabels.includes(label.label)
                    ? "border-2 border-blue-500 bg-olive-500 text-white"
                    : "bg-olive-200 text-gray-700"
                }`}
              >
                <div className="role-item-name">{label.label}</div>
              </div>
            </div>
          ))}
          {customLabels.map((label) => (
            <div
              className="justify-center items-center text-center"
              key={label.id}
            >
              <div
                onClick={() => handleSelect(label.label)}
                className={`flex items-center justify-center w-28 h-28 rounded-[50%] label-item mx-auto ${
                  selectedLabels.includes(label.label)
                    ? "border-2 border-blue-500 bg-olive-500 text-white"
                    : "bg-olive-200 text-gray-700"
                }`}
              >
                <div className="role-item-name">{label.label}</div>
              </div>{" "}
              <DeleteIcon
                className="delete-icon"
                onClick={() => handleDelete(label.id)}
              />
            </div>
          ))}
          <AddCustomLabel
            customLabels={customLabels}
            setCustomLabels={setCustomLabels}
            label={label}
            setLabel={setLabel}
          />
        </div>
      </div>
    </div>
  );
};

export default LabelsMenu;
