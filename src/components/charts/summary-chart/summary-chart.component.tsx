import { Doughnut } from "react-chartjs-2";
import { useChart } from "src/hooks/use-chart.hook";
import { useChartVariety } from "../variety/use-chart-variety.hook";
import { SegmentType } from "src/types/DataTypes.type";
import styles from "./summary-chart.module.scss";

type SummaryProps = {
  segment: SegmentType;
};

const Summary = (props: SummaryProps) => {
  const { segment } = props;
  const { summaryChartData, summaryData } = useChartVariety(segment)
  const { summaryChartOptions } = useChart();

  return (
    <div className={styles.wrapper}>
      <div className={styles.doughnutWrapper}>
        <Doughnut data={summaryChartData} options={summaryChartOptions} />
      </div>

      <ol className={styles.list}>
        {summaryData.map(({ name, amount }) => (
          <li key={name} className={styles.element}>
            <span>{name} -</span>
            <span className={styles.elementAmount}>{amount}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export { Summary }