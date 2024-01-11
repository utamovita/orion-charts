import { useDataState } from "src/context/data.context";
import { useChart } from "./useChart.hook";

type SummaryDataType = Array<{
  name: string;
  amount: number;
}>;

function useSummaryChart() {
  const state = useDataState();
  const { sort } = state;
  const { chartColors } = useChart();

  const getOrderedSummaryData = (summaryData: SummaryDataType) => {
    if (sort === "desc") {
      return summaryData.sort((a, b) => b.amount - a.amount);
    }

    if (sort === "asc") {
      return summaryData.sort((a, b) => a.amount - b.amount);
    }

    if (sort === "alpha") {
      return summaryData.sort((a, b) => a.name.localeCompare(b.name));
    }

    return summaryData;
  };

  const getChartData = (labels: string[], datasets: number[]) => {
    return {
      labels,
      datasets: [
        {
          data: datasets,
          backgroundColor: chartColors,
        },
      ],
    };
  };

  return { getOrderedSummaryData, getChartData };
}

export { useSummaryChart };
