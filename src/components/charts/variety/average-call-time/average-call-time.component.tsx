import { useDataState } from "src/context/data.context";
import { ChartHeader } from "../../charts.component";
import { MainChart } from "../../main-chart/main-chart.component";
import { Summary } from "../../summary-chart/summary-chart.component";

const AverageCallTime = () => {
  const state = useDataState();
  const { dateFrom, dateTo, view } = state.segmentData.averageCallTime;

  return (
    <>
      <ChartHeader
        title="Średni czas trwania rozmowy (sekundy)"
        segment="averageCallTime"
        segmentDateFrom={dateFrom}
        segmentDateTo={dateTo}
        view={view}
      />
      <MainChart segment="averageCallTime" />
      <Summary segment="averageCallTime" title="Średni czas trwania rozmowy (sekundy)" average={true} />
    </>
  );
};

export { AverageCallTime };
