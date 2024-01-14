import { useDataState } from "src/context/data.context";
import { useChart } from "./use-chart.hook";
import { RecordType, SegmentType } from "src/types/DataTypes.type";
import { getDayData } from "src/helpers/date";
import { useFilters } from "src/components/filters/use-filters.hook";

type SummaryDataType = Array<{
  name: string;
  amount: number;
}>;

function useSummaryChart() {
  const state = useDataState();
  const { sort } = state;
  const { chartColors } = useChart();
  const { segmentData } = useDataState();
  const { getFilteredData } = useFilters();

  const getSummaryListData = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;
    const dateFrom = segmentData[segment].dateFrom;
    const dateTo = segmentData[segment].dateTo;
    const data = getFilteredData(dateFrom, dateTo);
    const summaryData = [] as SummaryDataType;

    if (view === "daily") {
      const currentDayData = getDayData(currentDate, data);

      if (segment === "totalCalls") {
        currentDayData.map((item) => {
          summaryData.push({
            name: item.name,
            amount: item.data.length,
          });
        });
      }
    }

    if (view === "weekly") {
      //TODO
    }

    if (view === "monthly") {
      //TODO
    }

    if (view === "yearly") {
      //TODO
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

  const getSummaryChartData = (labels: string[], datasets: number[]) => {
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

  const getSummaryChartDatasets = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;
    const dateFrom = segmentData[segment].dateFrom;
    const dateTo = segmentData[segment].dateTo;
    const data = getFilteredData(dateFrom, dateTo);

    if (view === "daily") {
      const currentDayData = getDayData(currentDate, data);

      if (segment === "totalCalls") {
        const datasets: number[] = currentDayData.map((item) => {
          return item.data.length;
        });

        return datasets;
      }
    }

    if (view === "weekly") {
      //TODO
    }

    if (view === "monthly") {
      //TODO
    }

    if (view === "yearly") {
      //TODO
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
