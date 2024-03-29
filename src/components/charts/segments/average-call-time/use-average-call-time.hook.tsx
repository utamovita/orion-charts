import { useFilters } from "src/components/filters/use-filters.hook";
import { useDataState } from "src/context/data.context";
import { getDayData, getMonthData, getWeekData, getYearData } from "src/helpers/data";
import { roundToTwo, timeToSeconds } from "src/helpers/number";

function useAverageCallTime() {
  const { view, mainChart, dateFrom, dateTo } = useDataState().segmentData.averageCallTime;
  const { getFilteredData } = useFilters();
  const currentDate = mainChart.currentDate;
  const data = getFilteredData(dateFrom, dateTo);

  const getAverageCallTimeDatasets = () => {
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

        const totalCallTimeInSeconds = [
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //06:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //07:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //08:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //09:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //10:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //11:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //12:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //13:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //14:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //15:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //16:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //17:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //18:00
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //19:00
        ];

        item.data.map((item) => {
          if (item.date) {
            const callTimeInSeconds = timeToSeconds(item.callLength);
            const itemHour = new Date(item.date).getHours();

            if (itemHour >= 6 && itemHour <= 19) {
              totalCallTimeInSeconds[itemHour - 6] = {
                amountOfCalls: totalCallTimeInSeconds[itemHour - 6]
                  .amountOfCalls += 1,
                totalCallTimeInSeconds: totalCallTimeInSeconds[itemHour - 6]
                  .totalCallTimeInSeconds += callTimeInSeconds,
              };
            }
          }
        });

        for (let i = 0; i < totalCallTimeInSeconds.length; i++) {
          if (totalCallTimeInSeconds[i].totalCallTimeInSeconds > 0) {
            amountPerHourView[i] = Math.round(totalCallTimeInSeconds[i].totalCallTimeInSeconds / totalCallTimeInSeconds[i].amountOfCalls);
          }
        }

        return amountPerHourView;
      });

      return datasets;
    }

    if (view === "weekly") {
      const weekData = getWeekData(currentDate, data);

      const datasets: number[][] = weekData.map((item) => {
        const amountPerDayView = [
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //monday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //tuesday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //wednesday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //thursday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //friday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //saturday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //sunday
        ];

        item.data.map((item) => {
          const itemDay = new Date(item.date).getDay();

          if (timeToSeconds(item.callLength) > 0) {
            // sunday is 0, but we want it to be 6
            if (itemDay === 0) {
              amountPerDayView[6] = {
                amountOfCalls: amountPerDayView[6].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerDayView[6].totalCallTimeInSeconds += timeToSeconds(item.callLength),
              };
              return;
            }

            amountPerDayView[itemDay - 1] = {
              amountOfCalls: amountPerDayView[itemDay - 1].amountOfCalls += 1,
              totalCallTimeInSeconds: amountPerDayView[itemDay - 1].totalCallTimeInSeconds += timeToSeconds(item.callLength),
            };
          }
        });

        const dataset = amountPerDayView.map((item) => {
          if (item.totalCallTimeInSeconds > 0) {
            return roundToTwo(item.totalCallTimeInSeconds / item.amountOfCalls);
          }

          return 0;
        });

        return dataset;
      });

      return datasets;
    }

    if (view === "monthly") {
      const monthData = getMonthData(currentDate, data);

      const datasets: number[][] = monthData.map((item) => {
        const amountPerWeekView = [
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"01-07",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"08-14",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"15-21",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"22-28",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"29-31",
        ];

        item.data.map((item) => {
          const itemDay = new Date(item.date).getDate();

          if (timeToSeconds(item.callLength) > 0) {
            if (itemDay >= 1 && itemDay <= 7) {
              return amountPerWeekView[0] = {
                amountOfCalls: amountPerWeekView[0].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerWeekView[0].totalCallTimeInSeconds += timeToSeconds(item.callLength),
              };
            }

            if (itemDay >= 8 && itemDay <= 14) {
              return amountPerWeekView[1] = {
                amountOfCalls: amountPerWeekView[1].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerWeekView[1].totalCallTimeInSeconds += timeToSeconds(item.callLength),
              };
            }

            if (itemDay >= 15 && itemDay <= 21) {
              return amountPerWeekView[2] = {
                amountOfCalls: amountPerWeekView[2].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerWeekView[2].totalCallTimeInSeconds += timeToSeconds(item.callLength),
              };
            }

            if (itemDay >= 22 && itemDay <= 28) {
              return amountPerWeekView[3] = {
                amountOfCalls: amountPerWeekView[3].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerWeekView[3].totalCallTimeInSeconds += timeToSeconds(item.callLength),
              };
            }

            if (itemDay >= 29 && itemDay <= 31) {
              return amountPerWeekView[4] = {
                amountOfCalls: amountPerWeekView[4].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerWeekView[4].totalCallTimeInSeconds += timeToSeconds(item.callLength),
              };
            }
          }
        });

        const dataset = amountPerWeekView.map((item) => {
          if (item.totalCallTimeInSeconds > 0) {
            return roundToTwo(item.totalCallTimeInSeconds / item.amountOfCalls);
          }

          return 0;
        });

        return dataset;
      })

      return datasets;
    }

    if (view === "yearly") {
      const yearData = getYearData(currentDate, data);

      const datasets: number[][] = yearData.map((item) => {
        const amountPerMonthView = [
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"January",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"February",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"March",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"April",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"May",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"June",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"July",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"August",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"September",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"October",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"November",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"December",
        ];

        item.data.map((item) => {
          const itemMonth = new Date(item.date).getMonth();

          if (timeToSeconds(item.callLength) > 0) {
            amountPerMonthView[itemMonth] = {
              amountOfCalls: amountPerMonthView[itemMonth].amountOfCalls += 1,
              totalCallTimeInSeconds: amountPerMonthView[itemMonth].totalCallTimeInSeconds += timeToSeconds(item.callLength),
            };
          }
        });

        const dataset = amountPerMonthView.map((item) => {
          if (item.totalCallTimeInSeconds > 0) {
            return roundToTwo(item.totalCallTimeInSeconds / item.amountOfCalls);
          }

          return 0;
        });

        return dataset;
      });

      return datasets;
    }

    return []
  }

  const getAverageCallTimeSummaryDatasets = () => {
    const currentDayData = getDayData(currentDate, data);

    if (view === "daily") {
      const datasets: number[] = []

      currentDayData.map((item, index) => {
        let totalCallTimeInSeconds = 0;
        let amountOfCalls = 0;

        item.data.map((item) => {
          if (timeToSeconds(item.callLength) > 0) {
            totalCallTimeInSeconds += timeToSeconds(item.callLength);
            amountOfCalls += 1;
          }
        })

        if (amountOfCalls > 0) {
          return datasets[index] = roundToTwo(totalCallTimeInSeconds / amountOfCalls);
        }

        return datasets[index] = 0;
      });

      return datasets;
    }

    if (view === "weekly") {
      const weekData = getWeekData(currentDate, data);

      const datasets: number[] = weekData.map((item) => {
        const amountPerDayView = [
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //monday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //tuesday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //wednesday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //thursday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //friday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //saturday
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //sunday
        ];

        item.data.map((record) => {
          const itemDay = new Date(record.date).getDay();

          if (timeToSeconds(record.callLength) > 0) {
            // sunday is 0, but we want it to be 6
            if (itemDay === 0) {
              return amountPerDayView[6] = {
                amountOfCalls: amountPerDayView[6].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerDayView[6].totalCallTimeInSeconds += timeToSeconds(record.callLength),
              };

            }

            return amountPerDayView[itemDay - 1] = {
              amountOfCalls: amountPerDayView[itemDay - 1].amountOfCalls += 1,
              totalCallTimeInSeconds: amountPerDayView[itemDay - 1].totalCallTimeInSeconds += timeToSeconds(record.callLength),
            };
          }
        });

        const filteredAveragePerDay = amountPerDayView.map((item) => {
          return item.totalCallTimeInSeconds / item.amountOfCalls;
        }).filter((item) =>
          item > 0
        )

        const sumWeekAverage = filteredAveragePerDay.reduce((a, b) => a + b, 0);

        return roundToTwo(sumWeekAverage / filteredAveragePerDay.length);
      });

      return datasets;
    }

    if (view === "monthly") {
      const currentMonthData = getMonthData(currentDate, data);

      const datasets: number[] = currentMonthData.map((item) => {
        const amountPerWeekView = [
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"01-07",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"08-14",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"15-21",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"22-28",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"29-31",
        ];


        item.data.map((record) => {
          const itemDay = new Date(record.date).getDate();

          if (timeToSeconds(record.callLength) > 0) {
            if (itemDay >= 1 && itemDay <= 7) {
              return amountPerWeekView[0] = {
                amountOfCalls: amountPerWeekView[0].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerWeekView[0].totalCallTimeInSeconds += timeToSeconds(record.callLength),
              };
            }

            if (itemDay >= 8 && itemDay <= 14) {
              return amountPerWeekView[1] = {
                amountOfCalls: amountPerWeekView[1].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerWeekView[1].totalCallTimeInSeconds += timeToSeconds(record.callLength),
              };
            }

            if (itemDay >= 15 && itemDay <= 21) {
              return amountPerWeekView[2] = {
                amountOfCalls: amountPerWeekView[2].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerWeekView[2].totalCallTimeInSeconds += timeToSeconds(record.callLength),
              };
            }

            if (itemDay >= 22 && itemDay <= 28) {
              return amountPerWeekView[3] = {
                amountOfCalls: amountPerWeekView[3].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerWeekView[3].totalCallTimeInSeconds += timeToSeconds(record.callLength),
              };
            }

            if (itemDay >= 29 && itemDay <= 31) {
              return amountPerWeekView[4] = {
                amountOfCalls: amountPerWeekView[4].amountOfCalls += 1,
                totalCallTimeInSeconds: amountPerWeekView[4].totalCallTimeInSeconds += timeToSeconds(record.callLength),
              };
            }
          }
        });

        const filteredAveragePerDay = amountPerWeekView.map((item) => {
          return item.totalCallTimeInSeconds / item.amountOfCalls;
        }).filter((item) =>
          item > 0
        )

        const sumWeekAverage = filteredAveragePerDay.reduce((a, b) => a + b, 0);

        return roundToTwo(sumWeekAverage / filteredAveragePerDay.length);
      });

      return datasets;
    }

    if (view === "yearly") {
      const currentYearData = getYearData(currentDate, data);

      const datasets: number[] = currentYearData.map((item) => {
        const amountPerMonthView = [
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"January",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"February",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"March",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"April",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"May",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"June",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"July",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"August",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"September",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"October",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"November",
          { amountOfCalls: 0, totalCallTimeInSeconds: 0 }, //"December",
        ];

        item.data.map((record) => {
          const itemMonth = new Date(record.date).getMonth();

          if (timeToSeconds(record.callLength) > 0) {
            amountPerMonthView[itemMonth] = {
              amountOfCalls: amountPerMonthView[itemMonth].amountOfCalls += 1,
              totalCallTimeInSeconds: amountPerMonthView[itemMonth].totalCallTimeInSeconds += timeToSeconds(record.callLength),
            };
          }
        });

        const filteredAveragePerDay = amountPerMonthView.map((item) => {
          return item.totalCallTimeInSeconds / item.amountOfCalls;
        }).filter((item) =>
          item > 0
        )

        const sumWeekAverage = filteredAveragePerDay.reduce((a, b) => a + b, 0);

        return roundToTwo(sumWeekAverage / filteredAveragePerDay.length);
      });

      return datasets;
    }

    return [];
  }

  return { getAverageCallTimeDatasets, getAverageCallTimeSummaryDatasets }
}

export { useAverageCallTime }