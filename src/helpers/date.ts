import { DataType } from "src/types/DataTypes.type";
import { RecordType } from "src/types/DataTypes.type";

function formatDate(date: Date): string {
  const d = new Date(date);

  let day = "" + d.getDate();
  let month = "" + (d.getMonth() + 1);
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
}

const getDateRange = (dates: Date[]): { min: Date; max: Date } => {
  //@ts-ignore
  const min = new Date(Math.min(...dates));
  //@ts-ignore
  const max = new Date(Math.max(...dates));

  return { min, max };
};

const sumDatesByData = (data: RecordType[]) => {
  let allDates: Date[] = [];

  data.forEach((item) => {
    item.data.forEach((item) => {
      allDates.push(item.date);
    });
  });

  return allDates;
};

const filterDataByPassedDay = (currentDate: Date, data: Date[]) => {
  const dataFromCurrentDay = data.filter((item) => {
    const itemDate = new Date(item);
    const itemDay = itemDate.getDate();
    const itemMonth = itemDate.getMonth();
    const itemYear = itemDate.getFullYear();

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return (
      itemDay === currentDay &&
      itemMonth === currentMonth &&
      itemYear === currentYear
    );
  });

  return dataFromCurrentDay;
};

const getDayData = (currentDate: Date, data: RecordType[]) => {
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

export { formatDate, getDateRange, sumDatesByData, getDayData };
