import { useDataState } from "src/context/data.context";
import { useChart } from "src/hooks/useChart.hook";

const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
} as const;

export function useTotalCalls() {
  const state = useDataState();
  const { chartColors } = useChart();
  const { dateFrom, dateTo, sort } = state.segmentData.totalCalls;

  const filteredData = state.globalData.map((item) => ({
    name: item.name,
    data: item.data.filter((item) => {
      return item.date >= dateFrom && item.date <= dateTo;
    }),
  }));

  const labels = filteredData.map((item) => item.name);
  const datasets = filteredData.map((item) => item.data.length);

  //TODO: hook should return new array for list of total calls with name next to it (sorted)

  const chartData = {
    labels,
    datasets: [
      {
        data: datasets,
        backgroundColor: chartColors,
      },
    ],
  };

  return {
    chartOptions,
    chartData,
    chartColors,
    data: filteredData,
  };
}
