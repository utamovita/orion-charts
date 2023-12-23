import { Bar } from "react-chartjs-2";
import { useChart } from "../../../hooks/useChart.hook";

const CallsAmount = () => {
  const { chartColors, chartOptions } = useChart();
  const chartLlabels = [
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

  const chartData = {
    labels: chartLlabels,
    datasets: [
      {
        label: "Filip Marcinkowski",
        data: [55, 49, 80, 71, 56, 75, 40, 65, 32],
        backgroundColor: chartColors[0],
      },
    ],
  };

  return <Bar options={chartOptions} data={chartData} />;
};

export { CallsAmount };
