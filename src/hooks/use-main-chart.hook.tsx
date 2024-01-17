import { useDataState } from "src/context/data.context";
import { formatDate } from "src/helpers/date";
import { SegmentType } from "src/types/DataTypes.type";
import { useChart } from "./use-chart.hook";
import { useFilters } from "src/components/filters/use-filters.hook";
import { getDayData, getMonthData, getWeekData, getYearData } from "src/helpers/data";

const dailyViewChartLabels = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const weeklyViewChartLabels = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
];

const monthLabels = ["01-07", "08-14", "15-21", "22-28", "29-31"];

const yearlyViewChartLabels = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

function useMainChart() {
  const { segmentData } = useDataState();
  const { chartColors } = useChart();
  const { getFilteredData } = useFilters();

  const getLabels = (segment: SegmentType) => {
    const view = segmentData[segment].view;

    switch (view) {
      case "daily":
        return dailyViewChartLabels;
      case "weekly":
        return weeklyViewChartLabels;
      case "monthly":
        return monthLabels;
      case "yearly":
        return yearlyViewChartLabels;
      default:
        return dailyViewChartLabels;
    }
  };

  const getChartTitle = (segment: SegmentType) => {
    const d = segmentData[segment].mainChart.currentDate;
    const view = segmentData[segment].view;

    switch (view) {
      case "daily":
        const day = d.getDay();
        const specificDate = formatDate(d);

        // sunday is 0, but we want it to be 6

        const dayNumber = day === 0 ? 6 : day - 1;
        return `${weeklyViewChartLabels[dayNumber]} (${specificDate})`;

      case "weekly":
        const fromDate = d;
        const toDate = new Date(d);

        toDate.setDate(toDate.getDate() + 6);

        const from = formatDate(fromDate);
        const to = formatDate(toDate);

        return `${from} do ${to}`;

      case "monthly":
        const month = d.getMonth();

        return yearlyViewChartLabels[month];

      case "yearly":
        return d.getFullYear().toString();

      default:
        return null;
    }
  };

  const getMainChartData = (
    labelNames: string[],
    labels: string[],
    data: number[][]
  ) => {
    const datasets = data.map((item, index) => ({
      label: labelNames[index],
      data: item.map((item) => item),
      backgroundColor: chartColors[index],
      borderColor: chartColors[index],
    }));

    return {
      labels,
      datasets,
    };
  };

  const getMainChartDatasets = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;
    const dateFrom = segmentData[segment].dateFrom;
    const dateTo = segmentData[segment].dateTo;
    const data = getFilteredData(dateFrom, dateTo);

    if (view === "daily") {
      const currentDayData = getDayData(currentDate, data);

      const datasets: number[][] = currentDayData.map((item) => {
        const amountPerHourView = [
          0, //06:00
          0, //07:00
          0, //08:00
          0, //09:00
          0, //10:00
          0, //11:00
          0, //12:00
          0, //13:00
          0, //14:00
          0, //15:00
          0, //16:00
          0, //17:00
          0, //18:00
          0, //19:00
        ];

        if (segment === "totalCalls") {
          item.data.map((item) => {
            if (item.date) {
              const itemHour = new Date(item.date).getHours();

              if (itemHour >= 6 && itemHour <= 19) {
                amountPerHourView[itemHour - 6] += 1;
              }
            }
          });
        }

        return amountPerHourView;
      });

      return datasets;
    }

    if (view === "weekly") {
      const weekData = getWeekData(currentDate, data);

      //@ts-ignore
      const datasets: number[][] = weekData.map((item) => {
        const amountPerDayView: number[] = [
          0, //monday
          0, //tuesday
          0, //wednesday
          0, //thursday
          0, //friday
          0, //saturday
          0, //sunday
        ];

        if (segment === "totalCalls") {
          item.data.map((item) => {
            if (item.date) {
              const itemDay = new Date(item.date).getDay();

              // sunday is 0, but we want it to be 6
              if (itemDay === 0) {
                amountPerDayView[6] += 1;
                return;
              }

              amountPerDayView[itemDay - 1] += 1;
            }
          });

          return amountPerDayView;
        }
      });

      return datasets;
    }

    if (view === "monthly") {
      const currentMonthData = getMonthData(currentDate, data);

      //@ts-ignore
      const datasets: number[][] = currentMonthData.map((item) => {
        const amountPerWeekView: number[] = [
          0, //"01-07",
          0, //"08-14",
          0, //"15-21",
          0, //"22-28",
          0, //"29-31",
        ];

        if (segment === "totalCalls") {
          item.data.map((item) => {
            if (item.date) {
              const itemDay = new Date(item.date).getDate();

              if (itemDay >= 1 && itemDay <= 7) {
                amountPerWeekView[0] += 1;
                return;
              }

              if (itemDay >= 8 && itemDay <= 14) {
                amountPerWeekView[1] += 1;
                return;
              }

              if (itemDay >= 15 && itemDay <= 21) {
                amountPerWeekView[2] += 1;
                return;
              }

              if (itemDay >= 22 && itemDay <= 28) {
                amountPerWeekView[3] += 1;
                return;
              }

              if (itemDay >= 29 && itemDay <= 31) {
                amountPerWeekView[4] += 1;
                return;
              }
            }
          });

          return amountPerWeekView;
        }
      });

      return datasets;
    }

    if (view === "yearly") {
      const currentYearData = getYearData(currentDate, data);

      //@ts-ignore
      const datasets: number[][] = currentYearData.map((item) => {
        const amountPerMonthView: number[] = [
          0, //January
          0, //February
          0, //March
          0, //April
          0, //May
          0, //June
          0, //July
          0, //August
          0, //September
          0, //October
          0, //November
          0, //December
        ];

        if (segment === "totalCalls") {
          item.data.map((item) => {
            if (item.date) {
              const itemMonth = new Date(item.date).getMonth();

              amountPerMonthView[itemMonth] += 1;
            }
          });

          return amountPerMonthView;
        }
      });

      return datasets;
    }

    return [];
  };

  return {
    getLabels,
    getChartTitle,
    getMainChartData,
    getMainChartDatasets,
  };
}

export { useMainChart };
