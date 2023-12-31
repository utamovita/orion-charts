import { useDataState } from "../../context/data.context";
import { AverageCallAmount } from "./average-call-amount/average-call-amount";
import { TotalCallsSection } from "./total-calls/total-calls.component";
import { Calendar as CalendarIcon } from "@carbon/icons-react";
import { FilterButton } from "../filters/filters.component";
import { SegmentType, ViewType } from "src/types/DataTypes.type";
import { formatDate } from "src/helpers/date";
import { useChart } from "src/hooks/useChart.hook";
import { Container } from "../shared/container/container.component";
import styles from "./charts.module.scss";

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

  return (
    <>
      <h3 className={styles.sectionTitle}>{title}</h3>

      <div className={styles.header}>
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

  const { globalData, segmentData } = state;

  if (globalData.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <FilterButton />
      <Section>
        <TotalCallsSection />
      </Section>
      <Section>
        <AverageCallAmount />
      </Section>
      {/* <Section title="Średni c  zas trwania rozmowy (sekundy)">
        <Sample1 />
      </Section>
      <Section title="Kontrahenci">
        <Sample2 />
      </Section>
      <Section title="Ilość rozmów < 10s">
        <Sample3 />
      </Section> */}
    </div>
  );
};

export { Charts, ChartHeader };
