import { Bar } from "react-chartjs-2";
import { useChart } from "../../../hooks/useChart.hook";

const CallsAmount = () => {
  const { chartColors, chartOptions } = useChart();
  const chartLlabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const chartData = {
    labels: chartLlabels,
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: chartColors[0],
      },
    ],
  };

  return <Bar options={chartOptions} data={chartData} />;
};

export { CallsAmount };
