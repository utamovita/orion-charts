import * as React from "react";
import { DateRange, RangeKeyDict } from "react-date-range";
import plLocale from "date-fns/locale/pl";
import { useDataDispatch, useDataState } from "src/context/data.context";
import { SegmentType } from "src/types/DataTypes.type";
import { Button } from "../button/button.component";
import { useModalDispatch } from "src/context/modal.context";

type CustomDateRangePickerProps = {
  min: Date;
  segment: SegmentType;
};

function CustomDateRangePicker(props: CustomDateRangePickerProps) {
  const { min, segment } = props;
  const { globalMaxDate, globalMinDate, segmentData } = useDataState();
  const dispatch = useDataDispatch();
  const modalDispatch = useModalDispatch();
  const { selectedDateFrom, selectedDateTo } = segmentData[segment];

  const [error, setError] = React.useState<string | null>(null);

  const handleChange = (item: RangeKeyDict) => {
    if (item.selection.startDate && item.selection.endDate) {
      dispatch({
        type: "UPDATE_SELECTED_DATE_RANGE",
        segment: segment,
        dateFrom: item.selection.startDate,
        dateTo: item.selection.endDate,
      });
    }
  };

  const closePopup = () => {
    if (selectedDateFrom && selectedDateTo) {
      const startDate = selectedDateFrom;
      const endDate = selectedDateTo;

      startDate.setUTCHours(-1, 0, 0, 0);
      endDate.setUTCHours(22, 59, 59, 999);

      startDate.setDate(startDate.getDate() + 1);
      endDate.setDate(endDate.getDate() + 1);

      dispatch({
        type: "UPDATE_DATE_RANGE",
        segment: segment,
        dateFrom: startDate,
        dateTo: endDate,
      });

      modalDispatch({ type: "HIDE" });
      setError(null);
    }

    return setError("Wybierz zakres dat");
  };

  return (
    <>
      <DateRange
        locale={plLocale}
        shownDate={min}
        minDate={globalMinDate}
        maxDate={globalMaxDate}
        onChange={handleChange}
        ranges={[{
          startDate: selectedDateFrom,
          endDate: selectedDateTo,
          key: "selection"
        }]}
        startDatePlaceholder="Data początkowa"
        endDatePlaceholder="Data końcowa"
      />

      <Button onClick={closePopup}>Zapisz</Button>
      {error && <p>{error}</p>}
    </>
  );
}

export { CustomDateRangePicker };
