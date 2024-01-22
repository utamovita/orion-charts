import { useDataState } from "src/context/data.context";
import { ChartHeader } from "../../charts.component";
import { MainChart } from "../../main-chart/main-chart.component";
import { Summary } from "../../summary-chart/summary-chart.component";

const ShortCalls = () => {
  const state = useDataState();
  const { dateFrom, dateTo, view } = state.segmentData.shortCalls;


  return (
    <>
      <ChartHeader
        title="Ilość połączeń < 10s"
        segment="shortCalls"
        segmentDateFrom={dateFrom}
        segmentDateTo={dateTo}
        view={view}
      />
      <MainChart segment="shortCalls" />
      <Summary segment="shortCalls" title="Łączna ilość połączeń < 10s" />

    </>
  );
};

export { ShortCalls };
