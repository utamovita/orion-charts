import { RecordType } from "src/types/DataTypes.type";

const getUniqueNames = (data: RecordType[]) => {
  const allNames: string[] = [];

  data.forEach((item) => {
    allNames.push(item.name);
  });

  return [...new Set(allNames)].sort();
};

export { getUniqueNames };
