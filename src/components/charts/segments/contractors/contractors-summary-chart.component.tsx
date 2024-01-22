import { Doughnut } from "react-chartjs-2";
import { useContractors } from "./use-contractors.hook";
import styles from "../../summary-chart/summary-chart.module.scss";

const ContractorsSummary = () => {
  const { contractorsChartData, contractorsChartOptions, contractorsSummaryData } = useContractors();

  if (contractorsSummaryData.length === 0) {
    return (
      <div className={styles.noResults}>
        <h3 className={styles.noResultsTitle}>Brak danych do wyświetlenia</h3>
      </div>
    )
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Kontrahenci</h3>
      <div className={styles.summary}>
        <div className={styles.doughnutWrapper}>
          <Doughnut data={contractorsChartData} options={contractorsChartOptions} />
        </div>

        <ul className={styles.list}>
          {contractorsSummaryData.map((index) => {
            const name = Object.keys(index)[0];
            const amount = Object.values(index)[0];
            
            return (
              <li key={name} className={styles.element}>
                <span className={styles.elementName}>{name} -</span>
                <span className={styles.elementAmount}>{amount}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export { ContractorsSummary }