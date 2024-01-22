import { Doughnut } from "react-chartjs-2";
import { useChart } from "src/hooks/use-chart.hook";

import { SegmentType } from "src/types/DataTypes.type";
import styles from "./summary-chart.module.scss";
import { useSummaryChart } from "./use-summary-chart.hook";
import cx from "classnames";

type SummaryProps = {
  segment: SegmentType;
  title?: string;
  average?: boolean;
  variant?: "small" | "normal";
};

const Summary = (props: SummaryProps) => {
  const { segment, title, average = false, variant = "normal" } = props;
  const { summaryChartData, summaryListData } = useSummaryChart(segment, average)
  const { summaryChartOptions } = useChart();

  if (summaryListData.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3 className={styles.noResultsTitle}>Brak danych do wyświetlenia</h3>
      </div>
    )
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.summary}>
        <div className={cx(styles.doughnutWrapper, { [styles.small]: variant === "small" })}>
          <Doughnut data={summaryChartData} options={summaryChartOptions} />
        </div>

        <ul className={styles.list}>
          {summaryListData.map(({ name, amount, color }) => (
            <li key={name} className={styles.element}>
              <span
                className={styles.elementColor}
                style={{ backgroundColor: color }}
              ></span>
              <span className={styles.elementName}>{name} -</span>
              <span className={styles.elementAmount}>{amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { Summary }