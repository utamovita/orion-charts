import styles from "./total-calls.module.scss";
import { Doughnut } from "react-chartjs-2";
import { CustomDateRangePicker } from "src/components/shared/date-range-picker/date-range-picker.component";
import { useCallback } from "react";
import { useModalDispatch } from "src/context/modal.context";
import { Calendar as CalendarIcon } from "@carbon/icons-react";
import { useTotalCalls } from "./use-total-calls.hook";
import { formatDate } from "src/helpers/date";
import { useDataState } from "src/context/data.context";

const TotalCallsSection = () => {
  const modalDispatch = useModalDispatch();
  const { chartOptions, chartColors, chartData, data } = useTotalCalls();
  const state = useDataState();

  const { dateFrom, dateTo } = state.segmentData.totalCalls;
  const showDataRangePopup = useCallback(() => {
    const content = (
      <CustomDateRangePicker min={dateFrom} segment="totalCalls" />
    );

    modalDispatch({ type: "SHOW", payload: { content } });
  }, [modalDispatch]);


  return (
    <>
      <div className={styles.header}>
        <div>
          <h3 className={styles.subtitle}>
            Wybrany zakres: <br />
            od {formatDate(dateFrom)} <br />
            do {formatDate(dateTo)}
          </h3>
        </div>

        <button className={styles.dateRangeButton} onClick={showDataRangePopup}>
          Zmień zakres <CalendarIcon size={24} className={styles.icon} />
        </button>
      </div>

      <div className={styles.totalCallsWrapper}>
        <div className={styles.doughnutWrapper}>
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        <ul className={styles.totalCalls}>
          {data.map((item, index) => (
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
