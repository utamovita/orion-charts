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
      console.log(segment);
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
          <RadioGroup.Item value="daily" children={"Dzienny"} />
          <RadioGroup.Item value="weekly" children={"Tygodniowy"} />
          <RadioGroup.Item value="monthly" children={"Miesięczny"} />
          <RadioGroup.Item value="yearly" children={"Roczny"} />
        </RadioGroup>
      </div>
    </div>
  );
};

export { ChangeViewForm };
