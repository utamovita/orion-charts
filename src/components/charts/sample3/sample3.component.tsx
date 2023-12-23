import { Bar } from "react-chartjs-2";
import { useChart } from "../../../hooks/useChart.hook";

const Sample3 = () => {
  const { chartColors, chartOptions } = useChart();
  const chartLabels = [
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
    "Grudzień"
  ];

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Filip Marcinkowski",
        data: [65, 59, 90, 81, 96, 125, 30, 70, 20, 90, 50, 80],
        backgroundColor: chartColors[0],
      },
      {
        label: "Jakub Kleszcz",
        data: [75, 79, 80, 71, 76, 55, 60, 30, 50, 80, 30, 60],
        backgroundColor: chartColors[1],
      },
      {
        label: "Kacper Napierała",
        data: [43, 39, 70, 51, 56, 75, 70, 50, 80, 100, 70, 90],
        backgroundColor: chartColors[2],
      },
      {
        label: "Patryk Giel",
        data: [49, 29, 60, 61, 86, 85, 90, 90, 40, 110, 90, 30],
        backgroundColor: chartColors[3],
      },
    ],
  };

  return <Bar options={chartOptions} data={chartData} />;
};

export { Sample3 };
