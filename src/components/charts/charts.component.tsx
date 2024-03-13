import { useDataState } from "../../context/data.context";
import { TotalCalls } from "./segments/total-calls/total-calls.component";
import { Calendar as CalendarIcon } from "@carbon/icons-react";
import { FilterButton } from "../filters/filters.component";
import { SegmentType, ViewType } from "src/types/DataTypes.type";
import { formatDate } from "src/helpers/date";
import { useChart } from "src/hooks/use-chart.hook";
import { Container } from "../shared/container/container.component";
import styles from "./charts.module.scss";
import { AverageCallTime } from "./segments/average-call-time/average-call-time.component";
import { ShortCalls } from "./segments/short-calls/short-calls.component";
import { Contractors } from "./segments/contractors/contractors.component";
import { useEffect, useRef } from "react";
import { usePdfDispatch, usePdfState } from "src/context/pdf.context";
import cx from "classnames";

type ChartHeaderProps = {
  title: string;
  segment: SegmentType;
  segmentDateFrom: Date;
  segmentDateTo: Date;
  view: ViewType;
};

function ChartHeader(props: ChartHeaderProps) {
  const { showDataRangePopup, changeViewPopup } = useChart();
  const { title, segment, segmentDateFrom, segmentDateTo, view } = props;
  const { isPrintView } = usePdfState();

  return (
    <>
      <h3 className={styles.sectionTitle}>{title}</h3>

      <div className={cx(styles.header, { [styles.printView]: isPrintView })}>
        <div>
          <button
            className={styles.actionButton}
            onClick={() => showDataRangePopup(segment, segmentDateFrom)}
          >
            Zakres <CalendarIcon size={24} className={styles.icon} />
          </button>
          <h3 className={styles.subtitle}>
            od {formatDate(segmentDateFrom)} <br />
            do {formatDate(segmentDateTo)}
          </h3>
        </div>

        <div>
          <button
            className={styles.actionButton}
            onClick={() => changeViewPopup(segment)}
          >
            Widok <CalendarIcon size={24} className={styles.icon} />
          </button>

          <h3 className={styles.subtitle}>
            {view === "daily" ? "Dzienny" : null}
            {view === "weekly" ? "Tygodniowy" : null}
            {view === "monthly" ? "Miesięczny" : null}
            {view === "yearly" ? "Roczny" : null}
          </h3>
        </div>
      </div>
    </>
  );
}

type SectionProps = {
  children: React.ReactNode;
};

const Section = ({ children }: SectionProps) => {
  return (
    <div className={styles.section}>
      <Container>{children}</Container>
    </div>
  );
};

const Charts = () => {
  const state = useDataState();
  const ref = useRef(null);
  const { globalData } = state;
  const pdfDispatch = usePdfDispatch();

  useEffect(() => {
    pdfDispatch({ type: "UPDATE_REF", payload: { ref } });
  }, [ref, pdfDispatch]);

  if (globalData.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      <FilterButton />
      <Section>
        <TotalCalls />
      </Section>
      <Section>
        <AverageCallTime />
      </Section>
      <Section>
        <ShortCalls />
      </Section>
      <Section>
        <Contractors />
      </Section>
    </div>
  );
};

export { Charts, ChartHeader };
