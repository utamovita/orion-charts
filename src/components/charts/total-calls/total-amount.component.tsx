import { useDataState } from "src/context/data.context";
import styles from "../charts.module.scss";
import { Doughnut } from "react-chartjs-2";
import { useChart } from "src/hooks/useChart.hook";

const TotalCallsSection = () => {
  const state = useDataState();
  const { chartColors } = useChart();

  const sortedData = state.data.sort((a, b) => b.data.length - a.data.length);
  const labels = sortedData.map((item) => item.name);
  const datasets = sortedData.map((item) => item.data.length);

  const data = {
    labels,
    datasets: [
      {
        data: datasets,
        backgroundColor: chartColors,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={styles.totalCallsWrapper}>
      <div className={styles.doughnutWrapper}>
        <Doughnut data={data} options={options} />
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
  );
};

export { TotalCallsSection };
