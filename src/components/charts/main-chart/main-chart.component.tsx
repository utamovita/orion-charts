import { Line } from "react-chartjs-2";
import { useChart } from "src/hooks/use-chart.hook";
import { useMainChart } from "src/components/charts/main-chart/use-main-chart.hook";
import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
} from "@carbon/icons-react";
import { useChartNavigation } from "src/hooks/use-chart-navigation.hook";
import styles from "./main-chart.module.scss";
import { SegmentType } from "src/types/DataTypes.type";

type MainChartProps = {
  segment: SegmentType;
};

const MainChart = (props: MainChartProps) => {
  const { segment } = props;
  const { mainChartOptions } = useChart();
  const { chartTitle, mainChartData } = useMainChart(segment);
  const {
    handleNextButtonClick,
    handlePrevButtonClick,
    nextButtonDisabled,
    prevButtonDisabled,
  } = useChartNavigation();

  const prevBtnDisabled = prevButtonDisabled(segment);
  const nextBtnDisabled = nextButtonDisabled(segment);

  return (
    <>
      <h3 className={styles.title}>{chartTitle}</h3>
      <div className={styles.chart}>
        <button
          className={styles.arrowBtn}
          onClick={() => handlePrevButtonClick(segment)}
          disabled={prevBtnDisabled}
        >
          <ArrowLeftIcon />
        </button>

        <div className={styles.middle}>
          <Line options={mainChartOptions} data={mainChartData} />
        </div>
        <button
          className={styles.arrowBtn}
          onClick={() => handleNextButtonClick(segment)}
          disabled={nextBtnDisabled}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </>
  );
};

export { MainChart }