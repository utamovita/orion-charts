import { useDataState } from "src/context/data.context";
import styles from "./total-calls.module.scss";
import { Doughnut } from "react-chartjs-2";
import { useChart } from "src/hooks/useChart.hook";
import { getDateRange } from "src/helpers/date";

const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
} as const;

const TotalCallsSection = () => {
  const state = useDataState();
  const { chartColors } = useChart();

  const sortedData = state.data.sort((a, b) => b.data.length - a.data.length);
  const labels = sortedData.map((item) => item.name);
  const datasets = sortedData.map((item) => item.data.length);

  const sumDates = () => {
    let allDates: Date[] = [];

    state.data.forEach((item) => {
      item.data.forEach((item) => {
        allDates.push(item.date);
      });
    });

    return allDates;
  };

  const allDates = sumDates();
  const { min, max } = getDateRange(allDates);

  const data = {
    labels,
    datasets: [
      {
        data: datasets,
        backgroundColor: chartColors,
      },
    ],
  };

  return (
    <>
      {
        <h3 className={styles.subtitle}>
          Od {min} do {max}
        </h3>
      }
      <div className={styles.totalCallsWrapper}>
        <div className={styles.doughnutWrapper}>
          <Doughnut data={data} options={chartOptions} />
        </div>

        <ul className={styles.totalCalls}>
          {state.data.map((item, index) => (
            <li key={item.name} className={styles.element}>
              <span
                className={styles.totalCallsColor}
                style={{ backgroundColor: chartColors[index] }}
              ></span>
              <span>{item.name} </span>
              <span className={styles.elementAmount}>{item.data.length}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export { TotalCallsSection };
