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

function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

function isWeekday(y: number, m: number, d: number) {
  const day = new Date(y, m, d).getDay();
  return day != 0 && day != 6;
}

function getWeekdaysInMonth(date: Date) {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const days = daysInMonth(month, year);

  let weekdays = 0;

  for (var i = 0; i < days; i++) {
    if (isWeekday(year, month, i + 1))
      weekdays++;
  }

  return weekdays;
}

const workingHoursAmount = 8;
const workingDaysAmount = 5;
const averageWeeksAmount = 4.34;
const monthsAmount = 12;

export { formatDate, getDateRange, sumDatesByData, getWeekdaysInMonth, workingHoursAmount, workingDaysAmount, averageWeeksAmount, monthsAmount };
