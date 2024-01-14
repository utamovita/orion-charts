import { Bar } from "react-chartjs-2";
import { useChart } from "../../../hooks/use-chart.hook";
import { useAverageCallAmount } from "./use-average-call-amount.hook";
import { ChartHeader } from "../charts.component";
import { useDataState } from "src/context/data.context";

const AverageCallAmount = () => {
  const state = useDataState();
  const { chartOptions } = useChart();
  const { chartData } = useAverageCallAmount();
  const { dateFrom, dateTo, view } = state.segmentData.averageCallAmount;

  return (
    <>
      <ChartHeader
        title="Średnia ilość połączeń"
        segment="averageCallAmount"
        segmentDateFrom={dateFrom}
        segmentDateTo={dateTo}
        view={view}
      />
      <Bar options={chartOptions} data={chartData} />
    </>
  );
};

export { AverageCallAmount };
