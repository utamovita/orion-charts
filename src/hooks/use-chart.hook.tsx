import { useCallback } from "react";
import { SegmentType } from "src/types/DataTypes.type";
import { CustomDateRangePicker } from "src/components/shared/date-range-picker/date-range-picker.component";
import { useModalDispatch } from "src/context/modal.context";
import { ChangeViewForm } from "src/components/change-view-form/change-view-form.component";

const chartColors = [
  "230, 25, 75",    // #e6194b
  "60, 180, 75",    // #3cb44b
  "255, 225, 25",   // #ffe119
  "67, 99, 216",    // #4363d8
  "245, 130, 49",   // #f58231
  "145, 30, 180",   // #911eb4
  "70, 240, 240",   // #46f0f0
  "240, 50, 230",   // #f032e6
  "188, 246, 12",   // #bcf60c
  "250, 190, 190",  // #fabebe
  "0, 128, 128",    // #008080
  "230, 190, 255",  // #e6beff
  "154, 99, 36",    // #9a6324
  "22, 206, 166",   // #16cea6
  "128, 0, 0",      // #800000 
  "170, 255, 195",  // #aaffc3 
  "128, 128, 0",    // #808000 
  "255, 216, 177",  // #ffd8b1
  "0, 0, 117",      // #000075 
  "128, 128, 128",  // #808080
  "0, 0, 0",        // #000000 
  //same as above
  "230, 25, 75",    // #e6194b
  "60, 180, 75",    // #3cb44b
  "255, 225, 25",   // #ffe119
  "67, 99, 216",    // #4363d8
  "245, 130, 49",   // #f58231
  "145, 30, 180",   // #911eb4
  "70, 240, 240",   // #46f0f0
  "240, 50, 230",   // #f032e6
  "188, 246, 12",   // #bcf60c
  "250, 190, 190",  // #fabebe
  "0, 128, 128",    // #008080
  "230, 190, 255",  // #e6beff
  "154, 99, 36",    // #9a6324
  "22, 206, 166",   // #16cea6
  "128, 0, 0",      // #800000 
  "170, 255, 195",  // #aaffc3 
  "128, 128, 0",    // #808000 
  "255, 216, 177",  // #ffd8b1
  "0, 0, 117",      // #000075 
  "128, 128, 128",  // #808080
  "0, 0, 0",        // #000000 
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
