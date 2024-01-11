import { useCallback } from "react";
import { SegmentType } from "src/types/DataTypes.type";
import { CustomDateRangePicker } from "src/components/shared/date-range-picker/date-range-picker.component";
import { useModalDispatch } from "src/context/modal.context";
import { ChangeViewForm } from "src/components/change-view-form/change-view-form.component";

const chartColors = [
  "#ff990c",
  "#7475d4",
  "#6cc914",
  "#d93609",
  "#25d2db",
  "#8a02b0",
  "#d4db0d",
  "#35632f",
] as const;

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
} as const;

const summaryChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
} as const;

const mainChartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
} as const;

function useChart() {
  const modalDispatch = useModalDispatch();

  const showDataRangePopup = useCallback(
    (segment: SegmentType, segmentDateFrom: Date) => {
      const content = (
        <CustomDateRangePicker min={segmentDateFrom} segment={segment} />
      );

      modalDispatch({ type: "SHOW", payload: { content } });
    },
    [modalDispatch]
  );

  const changeViewPopup = useCallback(
    (segment: SegmentType) => {
      const content = <ChangeViewForm segment={segment} />;

      modalDispatch({ type: "SHOW", payload: { content } });
    },
    [modalDispatch]
  );

  return {
    chartColors,
    chartOptions,
    summaryChartOptions,
    mainChartOptions,
    showDataRangePopup,
    changeViewPopup,
  };
}

export { useChart };
