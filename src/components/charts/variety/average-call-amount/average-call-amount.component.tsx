import { useDataState } from "src/context/data.context";
import { ChartHeader } from "../../charts.component";
import { MainChart } from "../../main-chart/main-chart.component";
import { Summary } from "../../summary-chart/summary-chart.component";


const AverageCallAmount = () => {
  const state = useDataState();
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
      <MainChart segment="averageCallAmount"/>
      <Summary segment="averageCallAmount"/>
    </>
  );
};

export { AverageCallAmount };
