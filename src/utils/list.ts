export const updateItemInList = <T>(
  list: T[],
  property: keyof T,
  propertyToCompare: any,
  newValue: (item: T) => Partial<T>,
): T[] => {
  return list.map((item) =>
    item[property] === propertyToCompare ? { ...item, ...newValue(item) } : item,
  );
};
