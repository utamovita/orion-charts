import { Doughnut } from "react-chartjs-2";
import { useChart } from "src/hooks/use-chart.hook";
import { useChartVariety } from "../variety/use-chart-variety.hook";
import { SegmentType } from "src/types/DataTypes.type";
import styles from "./summary-chart.module.scss";

type SummaryProps = {
  segment: SegmentType;
  title?: string;
  average?: boolean;
};

const Summary = (props: SummaryProps) => {
  const { segment, title, average = false } = props;
  const { summaryChartData, summaryListData } = useChartVariety(segment, average)
  const { summaryChartOptions } = useChart();

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.summary}>
        <div className={styles.doughnutWrapper}>
          <Doughnut data={summaryChartData} options={summaryChartOptions} />
        </div>

        <ol className={styles.list}>
          {summaryListData.map(({ name, amount }) => (
            <li key={name} className={styles.element}>
              <span>{name} -</span>
              <span className={styles.elementAmount}>{amount}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export { Summary }