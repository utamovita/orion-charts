import { useChart } from "src/hooks/use-chart.hook";

export function useAverageCallAmount() {
  const { chartColors } = useChart();
  const chartLabels = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];
  const dateFrom = new Date("2021-01-01");
  const dateTo = new Date("2021-01-31");
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Filip Marcinkowski",
        data: [55, 49, 80, 71, 56, 75, 40, 65, 32],
        backgroundColor: chartColors[0],
      },
    ],
  };

  return {
    chartData,
    dateFrom,
    dateTo,
  };
}
