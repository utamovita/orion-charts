import { useDataState } from "../../context/data.context";
import { CallsAmount } from "./calls-amount/calls-amount.component";
import { TotalCallsSection } from "./total-calls/total-calls.component";

import { Sample1 } from "./sample1/sample1.component";
import { Sample2 } from "./sample2/sample2.component";
import { Sample3 } from "./sample3/sample3.component";
import styles from "./charts.module.scss";
import { FilterButton } from "../filters/filters.component";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {children}
    </div>
  );
};

const Charts = () => {
  const state = useDataState();

  const { globalData } = state;

  if (globalData.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <FilterButton />
      <Section title="Łączna ilość połączeń">
        <TotalCallsSection />
      </Section>
      <Section title="Średnia ilość połączeń">
        <CallsAmount />
      </Section>
      <Section title="Średni czas trwania rozmowy (sekundy)">
        <Sample1 />
      </Section>
      <Section title="Kontrahenci">
        <Sample2 />
      </Section>
      <Section title="Ilość rozmów < 10s">
        <Sample3 />
      </Section>
    </div>
  );
};

export { Charts };
