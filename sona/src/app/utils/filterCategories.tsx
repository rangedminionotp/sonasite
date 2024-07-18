export const filterCategories = (itemData: any, category: string) => {
  if (category === "" || category === "all items") {
    setCategoriedItems(itemData);
  } else {
    const keys = Object.keys(categoriedItems);
    keys.map((key) => {
      categoriedItems[key] = itemData[key].filter((item) =>
        item.tags.some((tag) => tag.includes(category))
      );
    });
    setCategoriedItems(categoriedItems);
  }
  return itemData;
};
