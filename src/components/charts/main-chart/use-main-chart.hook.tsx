import { useDataState } from "src/context/data.context";
import { formatDate } from "src/helpers/date";
import { RecordType, SegmentType } from "src/types/DataTypes.type";
import { useChart } from "../../../hooks/use-chart.hook";
import { useTotalCalls } from "src/components/charts/segments/total-calls/use-total-calls.hook";
import { useAverageCallTime } from "src/components/charts/segments/average-call-time/use-average-call-time.hook";
import { useFilters } from "src/components/filters/use-filters.hook";
import { useShortCalls } from "../segments/short-calls/use-short-calls.hook";

const dailyViewChartLabels = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const weeklyViewChartLabels = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
];

const monthLabels = ["01-07", "08-14", "15-21", "22-28", "29-31"];

const yearlyViewChartLabels = [
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
  "Grudzień",
];

function useMainChart(segment: SegmentType) {
  const { segmentData } = useDataState();
  const { chartColors } = useChart();
  const { getFilteredData } = useFilters();
  const { dateFrom, dateTo } = useDataState().segmentData[segment];
  const { getTotalCallsMainChartDatasets } = useTotalCalls();
  const { getAverageCallTimeDatasets } = useAverageCallTime();
  const { getShortCallsMainChartDatasets } = useShortCalls();

  const getLabels = () => {
    const view = segmentData[segment].view;

    switch (view) {
      case "daily":
        return dailyViewChartLabels;
      case "weekly":
        return weeklyViewChartLabels;
      case "monthly":
        return monthLabels;
      case "yearly":
        return yearlyViewChartLabels;
      default:
        return dailyViewChartLabels;
    }
  };

  const getChartTitle = () => {
    const d = segmentData[segment].mainChart.currentDate;
    const view = segmentData[segment].view;

    switch (view) {
      case "daily": {
        const day = d.getDay();
        const specificDate = formatDate(d);

        // sunday is 0, but we want it to be 6

        const dayNumber = day === 0 ? 6 : day - 1;
        return `${weeklyViewChartLabels[dayNumber]} (${specificDate})`;
      }
      case "weekly": {
        const fromDate = d;
        const toDate = new Date(d);

        toDate.setDate(toDate.getDate() + 6);

        const from = formatDate(fromDate);
        const to = formatDate(toDate);

        return `${from} do ${to}`;
      }
      case "monthly": {
        const month = d.getMonth();

        return yearlyViewChartLabels[month];
      }
      case "yearly":
        return d.getFullYear().toString();

      default:
        return null;
    }
  };

  const getMainChartData = (
    labelNames: string[],
    labels: string[],
    data: number[][]
  ) => {
    const datasets = data.map((item, index) => ({
      label: labelNames[index],
      data: item.map((item) => item),
      backgroundColor: `rgb(${chartColors[index]})`,
      borderColor: `rgb(${chartColors[index]})`,
    }));

    return {
      labels,
      datasets,
    };
  };

  const getMainChartDatasets = () => {
    if (segment === "totalCalls") {
      const datasets = getTotalCallsMainChartDatasets();

      return datasets;
    }

    if (segment === "averageCallTime") {
      const datasets = getAverageCallTimeDatasets();

      return datasets;
    }

    if (segment === "shortCalls") {
      const datasets = getShortCallsMainChartDatasets();

      return datasets;
    }

    return [];
  };


  const filteredData: RecordType[] = getFilteredData(dateFrom, dateTo);
  const labelNames = filteredData.map((item) => item.name);
  const mainChartLabels = getLabels();
  const mainChartDatasets = getMainChartDatasets();

  const mainChartData = getMainChartData(
    labelNames,
    mainChartLabels,
    mainChartDatasets
  );

  const chartTitle = getChartTitle();

  return {
    mainChartData,
    chartTitle
  };
}

export { useMainChart };
