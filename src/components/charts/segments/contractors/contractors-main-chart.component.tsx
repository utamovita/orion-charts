import { useChartNavigation } from "src/hooks/use-chart-navigation.hook";
import { useMainChart } from "../../main-chart/use-main-chart.hook";
import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from "@carbon/icons-react";
import styles from "../../main-chart/main-chart.module.scss";
import { Bar } from "react-chartjs-2";
import { useContractors } from "./use-contractors.hook";

const ContractorsMainChart = () => {
  const { contractorsChartData, contractorsChartOptions } = useContractors();
  const { chartTitle } = useMainChart("contractors");
  const {
    handleNextButtonClick,
    handlePrevButtonClick,
    nextButtonDisabled,
    prevButtonDisabled,
  } = useChartNavigation();

  const prevBtnDisabled = prevButtonDisabled("contractors");
  const nextBtnDisabled = nextButtonDisabled("contractors");


  return (
    <>
      <h3 className={styles.title}>{chartTitle}</h3>
      <div className={styles.chart}>
        <button
          className={styles.arrowBtn}
          onClick={() => handlePrevButtonClick("contractors")}
          disabled={prevBtnDisabled}
        >
          <ArrowLeftIcon />
        </button>

        <div className={styles.middle}>
          <Bar options={contractorsChartOptions} data={contractorsChartData} />
        </div>
        <button
          className={styles.arrowBtn}
          onClick={() => handleNextButtonClick("contractors")}
          disabled={nextBtnDisabled}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </>
  );
}

export { ContractorsMainChart }