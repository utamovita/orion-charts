import styles from "./total-calls.module.scss";
import { Doughnut, Line } from "react-chartjs-2";
import { useTotalCalls } from "./use-total-calls.hook";
import { useDataState } from "src/context/data.context";
import { ChartHeader } from "../charts.component";
import { useChart } from "src/hooks/use-chart.hook";
import { useMainChart } from "src/hooks/use-main-chart.hook";
import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from "@carbon/icons-react";

const MainChart = () => {
  const { mainChartData } = useTotalCalls();
  const { mainChartOptions } = useChart();
  const {
    getChartTitle,
    handleNextButtonClick,
    handlePrevButtonClick,
    prevButtonDisabled,
    nextButtonDisabled,
  } = useMainChart();

  const chartTitle = getChartTitle("totalCalls");
  const prevBtnDisabled = prevButtonDisabled("totalCalls");

  return (
    <div className={styles.mainChartWrapper}>
      <h3 className={styles.mainChartTitle}>{chartTitle}</h3>
      <div className={styles.mainChart}>
        <button
          className={styles.arrowBtn}
          onClick={() => handlePrevButtonClick("totalCalls")}
          disabled={prevBtnDisabled}
        >
          <ArrowLeftIcon />
        </button>

        <div className={styles.mainChartMiddle}>
          <Line options={mainChartOptions} data={mainChartData} />
        </div>
        <button
          className={styles.arrowBtn}
          onClick={() => handleNextButtonClick("totalCalls")}
          disabled={nextButtonDisabled("totalCalls")}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

const Summary = () => {
  const { summaryChartData, summaryData } = useTotalCalls();
  const { summaryChartOptions } = useChart();

  return (
    <div className={styles.totalCallsWrapper}>
      <div className={styles.doughnutWrapper}>
        <Doughnut data={summaryChartData} options={summaryChartOptions} />
      </div>

      <ol className={styles.list}>
        {summaryData.map(({ name, amount }, index) => (
          <li key={name} className={styles.element}>
            <span>{name} -</span>
            <span className={styles.elementAmount}>{amount}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

const TotalCallsSection = () => {
  const state = useDataState();
  const { summaryData } = useTotalCalls();
  const { dateFrom, dateTo, view } = state.segmentData.totalCalls;

  if (summaryData.length === 0) {
    return <h3 className={styles.noData}>Brak danych do wyświetlenia</h3>;
  }

  return (
    <>
      <ChartHeader
        title="Łączna ilość połączeń"
        segment="totalCalls"
        segmentDateFrom={dateFrom}
        segmentDateTo={dateTo}
        view={view}
      />
      <MainChart />
      <Summary />
    </>
  );
};

export { TotalCallsSection };
