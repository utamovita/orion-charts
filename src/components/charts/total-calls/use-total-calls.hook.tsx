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
  const { globalData, sort, segmentData, filterSelection } = state;
  const { dateFrom, dateTo } = segmentData.totalCalls;

  const filteredData = globalData
    .map((item) => ({
      name: item.name,
      data: item.data.filter((item) => {
        return item.date >= dateFrom && item.date <= dateTo;
      }),
    }))
    .filter((item) => {
      return filterSelection.includes(item.name);
    });

  const listData = filteredData.map((item) => ({
    name: item.name,
    amount: item.data.length,
  }));

  if (sort === "desc") {
    listData.sort((a, b) => b.amount - a.amount);
  }

  if (sort === "asc") {
    listData.sort((a, b) => a.amount - b.amount);
  }

  if (sort === "alpha") {
    listData.sort((a, b) => a.name.localeCompare(b.name));
  }

  const labels = filteredData.map((item) => item.name);
  const datasets = filteredData.map((item) => item.data.length);

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
    listData: listData,
  };
}
