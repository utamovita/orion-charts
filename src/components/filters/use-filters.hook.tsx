import { useDataState } from "src/context/data.context";
import { RecordType } from "src/types/DataTypes.type";

function useFilters() {
  const { globalData, filterSelection } = useDataState();

  const getFilteredData = (dateFrom: Date, dateTo: Date) => {
    return globalData
      .map((item) => ({
        name: item.name,
        data: item.data.filter((item) => {
          return item.date >= dateFrom && item.date <= dateTo;
        }),
      }))
      .filter((item) => {
        return filterSelection.includes(item.name);
      });
  };

  return { getFilteredData };
}

export { useFilters };
