//Utility Array

export const initialItems = new Array(39_999_999).fill(0).map((_, index) => {
  return {
    id: index + 1,
    isSelected: index === 39_999_998,
  };
});
