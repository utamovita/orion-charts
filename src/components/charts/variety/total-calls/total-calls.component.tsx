import { useDataState } from "src/context/data.context";
import { ChartHeader } from "../../charts.component";
import { MainChart } from "../../main-chart/main-chart.component";
import { Summary } from "../../summary-chart/summary-chart.component";

const TotalCallsSection = () => {
  const state = useDataState();
  const { dateFrom, dateTo, view } = state.segmentData.totalCalls;

  return (
    <>
      <ChartHeader
        title="Łączna ilość połączeń"
        segment="totalCalls"
        segmentDateFrom={dateFrom}
        segmentDateTo={dateTo}
        view={view}
      />
      <MainChart segment="totalCalls"/>
      <Summary segment="totalCalls"/>
    </>
  );
};

export { TotalCallsSection };
