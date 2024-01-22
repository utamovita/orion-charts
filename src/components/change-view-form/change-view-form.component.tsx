import { useDataDispatch, useDataState } from "src/context/data.context";
import { SegmentType } from "src/types/DataTypes.type";
import { RadioGroup } from "../shared/form/radio-group/radio-group.component";
import styles from "../filters/filters.module.scss";

type ChangeViewFormProps = {
  segment: SegmentType;
};

const ChangeViewForm = (props: ChangeViewFormProps) => {
  const dataDispatch = useDataDispatch();
  const { segment } = props;

  const view = useDataState().segmentData[segment].view;

  const handleSort = (value: string) => {
    if (
      value === "daily" ||
      value === "monthly" ||
      value === "yearly" ||
      value === "weekly"
    ) {
      dataDispatch({ type: "UPDATE_VIEW", view: value, segment });
    }
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentSection}>
        <h3 className={styles.contentTitle}>Widok</h3>
        <RadioGroup
          onChange={(value) => handleSort(value)}
          value={view}
          aria-label="Widok"
        >
          <RadioGroup.Item value="daily">
            Dzienny
          </RadioGroup.Item>
          <RadioGroup.Item value="weekly">
            Tygodniowy
          </RadioGroup.Item>
          <RadioGroup.Item value="monthly">
            Miesięczny
          </RadioGroup.Item>
          <RadioGroup.Item value="yearly">
            Roczny
          </RadioGroup.Item>
        </RadioGroup>
      </div>
    </div>
  );
};

export { ChangeViewForm };
