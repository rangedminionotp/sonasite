import React from "react";
import AddCustomLabel from "./AddCustomLabel";

interface GuideLabelsType {
  id: string;
  label: string;
}

const LabelsMenu = ({
  selectedLabels,
  setSelectedLabels,
}: {
  selectedLabels: GuideLabelsType[];
  setSelectedLabels: React.Dispatch<React.SetStateAction<GuideLabelsType[]>>;
}) => {
  const [labels, setLabels] = React.useState<GuideLabelsType[]>([]);

  const handleSelect = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels((prevLabels) => [...prevLabels, label]);
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
  }, [selectedLabels, setSelectedLabels]);

  return (
    <div className="w-full">
      <div className="description-subheader text-gray-200">
        Select Labels (max 5)
      </div>
      <div className="grid grid-cols-7 max-w-full gap-4">
        {labels.map((label) => (
          <div
            className="justify-center items-center text-center"
            onClick={() => handleSelect(label.label)}
          >
            <div
              className={`flex items-center justify-center w-28 h-28 rounded-full bg-gray-700 mx-auto ${
                selectedLabels.includes(label.label)
                  ? "border-2 border-blue-500"
                  : ""
              }`}
            >
              <div className=" role-item-name ">{label.label}</div>
            </div>
          </div>
        ))}
        <AddCustomLabel labels={labels} setLabels={setLabels} />
      </div>
    </div>
  );
};

export default LabelsMenu;
