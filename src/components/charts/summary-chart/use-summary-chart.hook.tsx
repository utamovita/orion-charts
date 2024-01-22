import { useDataDispatch, useDataState } from "src/context/data.context";
import { useChart } from "../../../hooks/use-chart.hook";
import { RecordType, SegmentType, SummaryDataListType } from "src/types/DataTypes.type";
import { useTotalCalls } from "src/components/charts/variety/total-calls/use-total-calls.hook";
import { useAverageCallTime } from "src/components/charts/variety/average-call-time/use-average-call-time.hook";
import { useFilters } from "src/components/filters/use-filters.hook";
import { useCallback } from "react";

export type SummaryDataType = Array<{
  name: string;
  amount: number;
}>;

function useSummaryChart(segment: SegmentType, average: boolean = false) {
  const { dateFrom, dateTo } = useDataState().segmentData[segment];
  const { chartColors } = useChart();
  const { getTotalCallsSummaryDatasets } = useTotalCalls();
  const { getAverageCallTimeSummaryDatasets } = useAverageCallTime();
  const { getFilteredData } = useFilters();
  const dispatch = useDataDispatch();

  const getSummaryChartData = useCallback((labels: string[], datasets: number[]) => {
   
    const summaryListData: SummaryDataListType = datasets.map((datasetAmount, index) => ({
      name: labels[index],
      amount: datasetAmount,
      color: chartColors[index],
    }));

    // dispatch({
    //   type: "UPDATE_SUMMARY_LIST_DATA",
    //   segment,
    //   summaryListData,
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
  }, []);

  const getSummaryChartDatasets = () => {
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

  const filteredData: RecordType[] = getFilteredData(dateFrom, dateTo);
  const labelNames = filteredData.map((item) => item.name);

  const summaryChartDatasets = getSummaryChartDatasets();
  const summaryChartData = getSummaryChartData(
    labelNames,
    summaryChartDatasets
  );

  return {
    summaryChartData
  };
}

export { useSummaryChart };
