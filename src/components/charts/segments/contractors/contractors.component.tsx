import { useDataState } from "src/context/data.context";
import { ChartHeader } from "../../charts.component";
import { ContractorsMainChart } from "./contractors-main-chart.component";
import { ContractorsSummary } from "./contractors-summary-chart.component";

const Contractors = () => {
  const state = useDataState();
  const { dateFrom, dateTo, view } = state.segmentData.contractors;

  return (
    <>
      <ChartHeader
        title="Kontrahenci"
        segment="contractors"
        segmentDateFrom={dateFrom}
        segmentDateTo={dateTo}
        view={view}
      />
      <ContractorsMainChart />
      <ContractorsSummary />
    </>
  );
};

export { Contractors };
