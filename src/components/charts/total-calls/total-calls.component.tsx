import styles from "./total-calls.module.scss";
import { Doughnut } from "react-chartjs-2";
import { useTotalCalls } from "./use-total-calls.hook";
import { useDataState } from "src/context/data.context";
import { ChartHeader } from "../charts.component";

const TotalCallsSection = () => {
  const { chartOptions, chartColors, chartData, listData } = useTotalCalls();
  const state = useDataState();
  const { dateFrom, dateTo, view } = state.segmentData.totalCalls;

  if (listData.length === 0) {
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

      <div className={styles.totalCallsWrapper}>
        <div className={styles.doughnutWrapper}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        <ul className={styles.totalCalls}>
          {listData.map(({ name, amount }, index) => (
            <li key={name} className={styles.element}>
              <span
                className={styles.totalCallsColor}
                style={{ backgroundColor: chartColors[index] }}
              ></span>
              <span>{name} </span>
              <span className={styles.elementAmount}>{amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export { TotalCallsSection };
