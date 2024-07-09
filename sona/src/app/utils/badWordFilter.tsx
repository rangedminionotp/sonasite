export const badWordFilter = async (tipsList, inputType) => {
  try {
    const query = {
      tipsList: tipsList,
      inputType: inputType,
    };
    const response = await fetch("/api/badWordFilter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching cleaned data:", error);
  }
};
