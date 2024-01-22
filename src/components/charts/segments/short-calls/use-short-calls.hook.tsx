import { useFilters } from "src/components/filters/use-filters.hook";
import { useDataState } from "src/context/data.context";
import { getDayData, getMonthData, getWeekData, getYearData } from "src/helpers/data";
import { timeToSeconds } from "src/helpers/number";

function useShortCalls() {
  const { view, mainChart, dateFrom, dateTo } = useDataState().segmentData.shortCalls;
  const { getFilteredData } = useFilters();
  const currentDate = mainChart.currentDate;
  const data = getFilteredData(dateFrom, dateTo);

  const maxSeconds = 10;

  const getShortCallsMainChartDatasets = () => {
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

        item.data.map((item) => {
          if (item.date) {
            const itemHour = new Date(item.date).getHours();

            if (itemHour >= 6 && itemHour <= 19 && timeToSeconds(item.callLength) < maxSeconds) {
              amountPerHourView[itemHour - 6] += 1;
            }
          }
        });
        return amountPerHourView;
      });

      return datasets;
    };

    if (view === "weekly") {
      const weekData = getWeekData(currentDate, data);

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

        item.data.map((item) => {
          const itemDay = new Date(item.date).getDay();

          if (timeToSeconds(item.callLength) < maxSeconds) {
            // sunday is 0, but we want it to be 6
            if (itemDay === 0) {
              amountPerDayView[6] += 1;
              return;
            }

            amountPerDayView[itemDay - 1] += 1;
          }
        });

        return amountPerDayView;

      });

      return datasets;
    }

    if (view === "monthly") {
      const currentMonthData = getMonthData(currentDate, data);

      const datasets: number[][] = currentMonthData.map((item) => {
        const amountPerWeekView: number[] = [
          0, //"01-07",
          0, //"08-14",
          0, //"15-21",
          0, //"22-28",
          0, //"29-31",
        ];

        item.data.map((item) => {
          if (timeToSeconds(item.callLength) < maxSeconds) {
            const itemDay = new Date(item.date).getDate();

            if (itemDay >= 1 && itemDay <= 7) {
              return amountPerWeekView[0] += 1;
            }

            if (itemDay >= 8 && itemDay <= 14) {
              return amountPerWeekView[1] += 1;
            }

            if (itemDay >= 15 && itemDay <= 21) {
              return amountPerWeekView[2] += 1;
            }

            if (itemDay >= 22 && itemDay <= 28) {
              return amountPerWeekView[3] += 1;
            }

            if (itemDay >= 29 && itemDay <= 31) {
              return amountPerWeekView[4] += 1;
            }
          }
        });

        return amountPerWeekView;

      });

      return datasets;
    }

    if (view === "yearly") {
      const currentYearData = getYearData(currentDate, data);

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

        item.data.map((item) => {
          if (item.date) {
            const itemMonth = new Date(item.date).getMonth();

            if (timeToSeconds(item.callLength) < maxSeconds) {
              amountPerMonthView[itemMonth] += 1;
            }
          }
        });

        return amountPerMonthView;

      });

      return datasets;

    }

    return []
  }

  const getShortCallsSummaryDatasets = () => {
    if (view === "daily") {
      const currentDayData = getDayData(currentDate, data);

      const datasets: number[] = currentDayData.map((item) => {
        return item.data.filter((item) => timeToSeconds(item.callLength) < maxSeconds).length;
      });

      return datasets;
    }

    if (view === "weekly") {
      const currentWeekData = getWeekData(currentDate, data);

      const datasets: number[] = currentWeekData.map((item) => {
        return item.data.filter((item) => timeToSeconds(item.callLength) < maxSeconds).length;
      });

      return datasets;
    }

    if (view === "monthly") {
      const currentMonthData = getMonthData(currentDate, data);

      const datasets: number[] = currentMonthData.map((item) => {
        return item.data.filter((item) => timeToSeconds(item.callLength) < maxSeconds).length;
      });

      return datasets;
    }

    if (view === "yearly") {
      const currentYearData = getYearData(currentDate, data);

      const datasets: number[] = currentYearData.map((item) => {
        return item.data.filter((item) => timeToSeconds(item.callLength) < maxSeconds).length;
      });

      return datasets;
    }

    return []
  }

  return {
    getShortCallsSummaryDatasets,
    getShortCallsMainChartDatasets,
  }
}

export { useShortCalls }