import { useDataState } from "src/context/data.context";
import { ChartHeader } from "../../charts.component";
import { MainChart } from "../../main-chart/main-chart.component";
import { Summary } from "../../summary-chart/summary-chart.component";

const TotalCalls = () => {
  const state = useDataState();
  const { dateFrom, dateTo, view } = state.segmentData.totalCalls;

  return (
    <>
      <ChartHeader
        title="Ilość połączeń"
        segment="totalCalls"
        segmentDateFrom={dateFrom}
        segmentDateTo={dateTo}
        view={view}
      />
      <MainChart segment="totalCalls" />
      <div style={{ display: "Flex", justifyContent: "space-between" }}>
        <Summary segment="totalCalls" title="Łączna ilość połączeń" variant="small" />
        <Summary segment="totalCalls" title="Średnia ilość połączeń" average={true} variant="small" />
      </div>
    </>
  );
};

export { TotalCalls };
