import { useCallback } from "react";
import { useDataDispatch, useDataState } from "src/context/data.context";
import { useModalDispatch } from "src/context/modal.context";
import {
  DocumentDownload as DownloadIcon,
  Edit as EditIcon,
  Filter as FilterIcon,
  SortDescending as SortDescIcon,
} from "@carbon/icons-react";
import { Checkbox } from "../shared/form/checkbox/checkbox.component";
import { SortType } from "src/types/DataTypes.type";
import styles from "./filters.module.scss";
import { RadioGroup } from "../shared/form/radio-group/radio-group.component";
import { getUniqueNames } from "src/helpers/data";
import { PrintPDF } from "../print-pdf/print-pdf.component";
import { usePdfState } from "src/context/pdf.context";

const FilterContent = () => {
  const dataDispatch = useDataDispatch();
  const state = useDataState();

  const { globalData, filterSelection, sort } = state;

  const uniqueNames = getUniqueNames(globalData);

  const handleSort = (value: string) => {
    if (value === "desc" || value === "asc" || value === "alpha") {
      dataDispatch({ type: "UPDATE_SORTING", sort: value as SortType });
    }
  };

  const handleSelection = (checked: boolean, name: string) => {
    dataDispatch({ type: "UPDATE_FILTER_SELECTION", checked, name });
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentSection}>
        <h3 className={styles.contentTitle}>
          Sortuj <SortDescIcon size={22} className={styles.icon} />
        </h3>
        <RadioGroup
          onChange={(value) => handleSort(value)}
          value={sort}
          aria-label="Sortuj"
        >
          <RadioGroup.Item value="desc">
            Malejąco
          </RadioGroup.Item>
          <RadioGroup.Item value="asc">
            Rosnąco
          </RadioGroup.Item>
          <RadioGroup.Item value="alpha">
            Alfabetycznie
          </RadioGroup.Item>
        </RadioGroup>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.contentTitle}>
          Filtruj <FilterIcon size={22} />
        </h3>

        <div className={styles.namesWrapper}>
          {uniqueNames.map((name) => (
            <Checkbox
              key={name}
              label={name}
              onChange={(checked) => handleSelection(checked, name)}
              isLarge
              isSelected={filterSelection.includes(name)}
            />
          ))}
        </div>
      </div>

      <div className={styles.contentSection}>
        <h3 className={styles.contentTitle}>
          Akcje <DownloadIcon size={22} />
        </h3>

        <PrintPDF />
      </div>
    </div>
  );
};

const FilterButton = () => {
  const modalDispatch = useModalDispatch();
  const { isPrintView } = usePdfState();

  const showFiltersPopup = useCallback(() => {
    const content = <FilterContent />;

    modalDispatch({ type: "SHOW", payload: { content } });
  }, [modalDispatch]);

  if (isPrintView) {
    return null;
  }

  return (
    <button className={styles.filterButton} onClick={showFiltersPopup}>
      <EditIcon className={styles.filterButtonIcon} />
    </button>
  );
};

export { FilterButton };
