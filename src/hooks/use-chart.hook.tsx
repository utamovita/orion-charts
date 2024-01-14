import { useCallback } from "react";
import { SegmentType } from "src/types/DataTypes.type";
import { CustomDateRangePicker } from "src/components/shared/date-range-picker/date-range-picker.component";
import { useModalDispatch } from "src/context/modal.context";
import { ChangeViewForm } from "src/components/change-view-form/change-view-form.component";

const chartColors = [
  "#e6194b",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#46f0f0",
  "#f032e6",
  "#bcf60c",
  "#fabebe",
  "#008080",
  "#e6beff",
  "#9a6324",
  "#16cea6",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#000075",
  "#808080",
  "#000000",
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
      display: true,
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
