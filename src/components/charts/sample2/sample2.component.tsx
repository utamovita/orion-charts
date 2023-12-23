import { Bar } from "react-chartjs-2";
import { useChart } from "../../../hooks/useChart.hook";

const Sample2 = () => {
  const { chartColors, chartOptions } = useChart();
  const chartLabels = [
    "DE",
    "AT",
    "NL",
    "SWE",
    "BE",
    "US",
  ];

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Kraj",
        data: [315, 289, 260, 131, 76, 30],
        backgroundColor: chartColors[0],
      },
    ],
  };

  return <Bar options={chartOptions} data={chartData} />;
};

export { Sample2 };
