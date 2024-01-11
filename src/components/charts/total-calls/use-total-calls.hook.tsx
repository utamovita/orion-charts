import { useFilters } from "src/components/filters/use-filters.hook";
import { useDataState } from "src/context/data.context";
import { useMainChart } from "src/hooks/use-main-chart.hook";
import { useSummaryChart } from "src/hooks/use-summary-chart";

export function useTotalCalls() {
  const { dateFrom, dateTo } = useDataState().segmentData.totalCalls;
  const { getOrderedSummaryData, getChartData } = useSummaryChart();
  const { getFilteredData } = useFilters();
  const { getLabels } = useMainChart();

  const filteredData = getFilteredData(dateFrom, dateTo);

  // main chart
  const mainChartLabels = getLabels("totalCalls");
  const mainChartDatasets: number[] = [];
  const mainChartData = getChartData(mainChartLabels, mainChartDatasets);

  // summary chart
  const summaryData = filteredData.map((item) => ({
    name: item.name,
    amount: item.data.length,
  }));

  const summaryOrderedData = getOrderedSummaryData(summaryData);
  const summaryChartlabels = filteredData.map((item) => item.name);
  const summaryChartDatasets = filteredData.map((item) => item.data.length);

  const summaryChartData = getChartData(
    summaryChartlabels,
    summaryChartDatasets
  );

  return {
    mainChartData,
    summaryChartData,
    summaryData: summaryOrderedData,
  };
}
