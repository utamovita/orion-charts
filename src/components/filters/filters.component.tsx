import { ReactHTMLElement, useCallback } from "react";
import { useDataDispatch, useDataState } from "src/context/data.context";
import { useModalDispatch } from "src/context/modal.context";
import {
  Edit as EditIcon,
  Filter as FilterIcon,
  SortDescending as SortDescIcon,
} from "@carbon/icons-react";
import { Checkbox } from "../shared/form/checkbox/checkbox.component";
import { SortType } from "src/types/DataTypes.type";
import styles from "./filters.module.scss";
import { RadioGroup } from "../shared/form/radio-group/radio-group.component";
import { getUniqueNames } from "src/helpers/data";

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
          <RadioGroup.Item value="desc" children={"Malejąco"} />
          <RadioGroup.Item value="asc" children={"Rosnąco"} />
          <RadioGroup.Item value="alpha" children={"Alfabetycznie"} />
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
    </div>
  );
};

const FilterButton = () => {
  const modalDispatch = useModalDispatch();

  const showFiltersPopup = useCallback(() => {
    const content = <FilterContent />;

    modalDispatch({ type: "SHOW", payload: { content } });
  }, [modalDispatch]);

  return (
    <button className={styles.filterButton} onClick={showFiltersPopup}>
      <EditIcon className={styles.filterButtonIcon} />
    </button>
  );
};

export { FilterButton };
