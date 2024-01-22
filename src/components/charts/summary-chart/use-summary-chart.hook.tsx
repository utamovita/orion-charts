import { useDataState } from "src/context/data.context";
import { useChart } from "../../../hooks/use-chart.hook";
import { RecordType, SegmentType, SummaryDataListType } from "src/types/DataTypes.type";
import { useTotalCalls } from "src/components/charts/variety/total-calls/use-total-calls.hook";
import { useAverageCallTime } from "src/components/charts/variety/average-call-time/use-average-call-time.hook";
import { useFilters } from "src/components/filters/use-filters.hook";


export type SummaryDataType = Array<{
  name: string;
  amount: number;
}>;

function useSummaryChart(segment: SegmentType, average: boolean = false) {
  const { sort, segmentData } = useDataState();
  const { dateFrom, dateTo } = segmentData[segment];

  const { chartColors } = useChart();
  const { getTotalCallsSummaryDatasets } = useTotalCalls();
  const { getAverageCallTimeSummaryDatasets } = useAverageCallTime();
  const { getFilteredData } = useFilters();

  const getSummaryChartData = (labels: string[], datasets: number[]) => {
    const summaryListData: SummaryDataListType = datasets.map((datasetAmount, index) => ({
      name: labels[index],
      amount: datasetAmount,
      color: chartColors[index],
    }));

    return {
      chart: {
        labels,
        datasets: [
          {
            data: datasets,
            backgroundColor: chartColors,
          },
        ],
      },
      list: summaryListData,
    }
  };

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
  const { chart, list } = getSummaryChartData(
    labelNames,
    summaryChartDatasets
  );

  if (sort === "desc") {
     list.sort((a, b) => b.amount - a.amount);
  }

  if (sort === "asc") {
    list.sort((a, b) => a.amount - b.amount);
  }

  if (sort === "alpha") {
     list.sort((a, b) => a.name.localeCompare(b.name));
  }

  const filteredList = list.filter((item) => item.amount > 0);
  
  return {
    summaryChartData: chart,
    summaryListData: filteredList,
  };
}

export { useSummaryChart };
