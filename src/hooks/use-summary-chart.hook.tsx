import { useDataDispatch, useDataState } from "src/context/data.context";
import { useChart } from "./use-chart.hook";
import { SegmentType, SummaryDataListType } from "src/types/DataTypes.type";
import { useTotalCalls } from "src/components/charts/variety/total-calls/use-total-calls.hook";
import { useAverageCallTime } from "src/components/charts/variety/average-call-time/use-average-call-time.hook";

export type SummaryDataType = Array<{
  name: string;
  amount: number;
}>;

function useSummaryChart() {
  const state = useDataState();
  const { sort } = state;
  const { chartColors } = useChart();
  const { getTotalCallsSummaryListData, getTotalCallsSummaryDatasets } = useTotalCalls();
  const { getAverageCallTimeSummaryDatasets, getAverageCallTimeSummaryListData } = useAverageCallTime();
  const dispatch = useDataDispatch();

  const getSummaryListData = (segment: SegmentType, average: boolean) => {
    const summaryData = [] as SummaryDataType;

    if (segment === "totalCalls") {
      const data = getTotalCallsSummaryListData(average);

      summaryData.push(...data);
    }

    if(segment === "averageCallTime") {
      const data = getAverageCallTimeSummaryListData();

      summaryData.push(...data);
    }

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

  const getSummaryChartData = (labels: string[], datasets: number[], segment: SegmentType) => {
    const summaryListData: SummaryDataListType = datasets.map((datasetAmount, index) => ({
      name: labels[index],
      amount: datasetAmount,
      color: chartColors[index],
    }));

    // dispatch({
    //   type: "UPDATE_SUMMARY_LIST_DATA",
    //   summaryListData,
    //   segment,
    // });

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

  const getSummaryChartDatasets = (segment: SegmentType, average: boolean) => {
    if (segment === "totalCalls") {
      const datasets = getTotalCallsSummaryDatasets(average);

      return datasets;
    }

    if (segment === "averageCallTime") {
      const datasets = getAverageCallTimeSummaryDatasets();

      return datasets;
    }

    return [];
  };

  return {
    getSummaryChartData,
    getSummaryChartDatasets,
    getSummaryListData,
  };
}

export { useSummaryChart };
