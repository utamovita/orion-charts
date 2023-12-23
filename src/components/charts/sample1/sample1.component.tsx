import { Line } from "react-chartjs-2";
import { useChart } from "../../../hooks/useChart.hook";

const Sample1 = () => {
  const { chartColors } = useChart();
  const chartLabels = [
    "04-12-23",
    "05-12-23",
    "06-12-23",
    "07-12-23",
    "08-12-23",
  ];

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Filip Marcinkowski",
        data: [9, 20, 17, 5, 15],
        backgroundColor: chartColors[0],
        borderColor: chartColors[0],
      },
      {
        label: "Jakub Kleszcz",
        data: [14, 15, 29, 11, 28],
        backgroundColor: chartColors[1],
        borderColor: chartColors[1],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  
    tension: 0.2,
  } as const;

  return <Line options={chartOptions} data={chartData} />;
};

export { Sample1 };
