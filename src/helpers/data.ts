import { useDataState } from "src/context/data.context";
import { DataType, RecordType, WeekdayType } from "src/types/DataTypes.type";
import { formatDate } from "./date";

const getUniqueNames = (data: RecordType[]) => {
  const allNames: string[] = [];

  data.forEach((item) => {
    allNames.push(item.name);
  });

  return [...new Set(allNames)].sort();
};

const getDayData = (currentDate: Date, data: RecordType[]): RecordType[] => {
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const dataFromCurrentDay: RecordType[] = data.map((item) => {
    const itemData: DataType[] = item.data.filter((item) => {
      const itemDate = new Date(item.date);
      const itemDay = itemDate.getDate();
      const itemMonth = itemDate.getMonth();
      const itemYear = itemDate.getFullYear();

      return (
        itemDay === currentDay &&
        itemMonth === currentMonth &&
        itemYear === currentYear
      );
    });

    return {
      name: item.name,
      data: itemData,
    };
  });

  return dataFromCurrentDay;
};

const getWeekData = (currentDate: Date, data: RecordType[]): RecordType[] => {
  const dateFrom = new Date(currentDate);
  const dateTo = new Date(currentDate);
  dateTo.setDate(dateTo.getDate() + 7);

  const dataFromCurrentWeek: RecordType[] = data.map((item) => {
    return {
      name: item.name,
      data: item.data.filter((item) => {
        const itemDate = new Date(item.date);

        return itemDate >= dateFrom && itemDate <= dateTo;
      }),
    };
  });

  return dataFromCurrentWeek;
}

const getMonthData = (currentDate: Date, data: RecordType[]): RecordType[] => {
  const dateFrom = new Date(currentDate);
  const dateTo = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  dateTo.setHours(23, 59, 59, 999);

  const dataFromCurrentMonth: RecordType[] = data.map((item) => {
    return {
      name: item.name,
      data: item.data.filter((item) => {
        const itemDate = new Date(item.date);

        return itemDate >= dateFrom && itemDate <= dateTo;
      }),
    };
  });

  return dataFromCurrentMonth;
}

const getYearData = (currentDate: Date, data: RecordType[]): RecordType[] => {
  const dateFrom = new Date(currentDate.getFullYear(), 0, 1);
  dateFrom.setHours(0, 0, 0, 0);

  const dateTo = new Date(currentDate.getFullYear(), 11, 31);
  dateTo.setHours(23, 59, 59, 999);


  console.log(dateFrom, dateTo);
  const dataFromCurrentYear: RecordType[] = data.map((item) => {
    return {
      name: item.name,
      data: item.data.filter((item) => {
        const itemDate = new Date(item.date);

        return itemDate >= dateFrom && itemDate <= dateTo;
      }),
    };
  });

  return dataFromCurrentYear;
}

export { getUniqueNames, getDayData, getWeekData, getMonthData, getYearData };
