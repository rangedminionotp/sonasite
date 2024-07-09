export const badWordFilter = async (tipsList) => {
  try {
    console.log("ability tips", tipsList);
    const response = await fetch("/api/badWordFilter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tipsList),
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
