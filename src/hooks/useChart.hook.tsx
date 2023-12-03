import { useDataState } from "../context/data.context";

const chartColors = [
  "#ff990c",
  "#7475d4",
  "#6cc914",
  "#d93609",
  "#25d2db",
  "#8a02b0",
  "#d4db0d",
  "#35632f",
] as const;

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
} as const;

function useChart() {
  const state = useDataState();

  console.log(state.data);
  return { chartColors, chartOptions };
}

export { useChart };
