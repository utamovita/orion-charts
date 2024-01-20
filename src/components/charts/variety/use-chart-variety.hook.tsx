import { useFilters } from "src/components/filters/use-filters.hook";
import { useDataState } from "src/context/data.context";
import { useMainChart } from "src/hooks/use-main-chart.hook";
import { useSummaryChart } from "src/hooks/use-summary-chart.hook";
import { RecordType, SegmentType } from "src/types/DataTypes.type";

export function useChartVariety(segment: SegmentType) {
  const { dateFrom, dateTo } = useDataState().segmentData[segment];
  const { getSummaryListData, getSummaryChartData, getSummaryChartDatasets } =
    useSummaryChart();
  const { getFilteredData } = useFilters();
  const { getLabels, getMainChartData, getMainChartDatasets } = useMainChart();

  const filteredData: RecordType[] = getFilteredData(dateFrom, dateTo);
  const labelNames = filteredData.map((item) => item.name);

  const mainChartLabels = getLabels(segment);
  const mainChartDatasets = getMainChartDatasets(segment);
  const mainChartData = getMainChartData(
    labelNames,
    mainChartLabels,
    mainChartDatasets
  );

  const summaryData = getSummaryListData(segment);
  const summaryChartDatasets = getSummaryChartDatasets(segment);
  const summaryChartData = getSummaryChartData(
    labelNames,
    summaryChartDatasets
  );

  return {
    mainChartData,
    summaryChartData,
    summaryData,
  };
}
