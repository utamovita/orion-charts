import { useDataState } from "../../context/data.context";
import { CallsAmount } from "./calls-amount/calls-amount.component";
import { TotalCallsSection } from "./total-calls/total-amount.component";
import styles from "./charts.module.scss";

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

  // if (state.data.length === 0) {
  //   return null;
  // }

  return (
    <div>
      <Section title="Łączna ilość połączeń">
        <TotalCallsSection />
      </Section>
      <Section title="Ilość połączeń (przedział czasowy)">
        <CallsAmount />
      </Section>
    </div>
  );
};

export { Charts };
