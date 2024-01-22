import { Doughnut } from "react-chartjs-2";
import { useChart } from "src/hooks/use-chart.hook";

import { SegmentType, SummaryDataListType } from "src/types/DataTypes.type";
import styles from "./summary-chart.module.scss";
import { useSummaryChart } from "./use-summary-chart.hook";

type SummaryProps = {
  segment: SegmentType;
  title?: string;
  average?: boolean;
};

const Summary = (props: SummaryProps) => {
  const { segment, title, average = false } = props;
  const { summaryChartData } = useSummaryChart(segment, average)
  const { summaryChartOptions } = useChart();

  const summaryListData: SummaryDataListType = [
    {
      name: "Filip Kowalski",
      amount: 100,
      color: "#FF0000",
    },
  ]

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.summary}>
        <div className={styles.doughnutWrapper}>
          <Doughnut data={summaryChartData} options={summaryChartOptions} />
        </div>

        <ul className={styles.list}>
          {summaryListData.map(({ name, amount, color }) => (
            <li key={name} className={styles.element}>
              <span
                className={styles.elementColor}
                style={{ backgroundColor: color }}
              ></span>
              <span>{name} -</span>
              <span className={styles.elementAmount}>{amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Summary }