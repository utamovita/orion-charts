import { useDataDispatch, useDataState } from "src/context/data.context";
import { formatDate, getDayData } from "src/helpers/date";
import { SegmentType } from "src/types/DataTypes.type";
import { useChart } from "./use-chart.hook";
import { useFilters } from "src/components/filters/use-filters.hook";

const dailyViewChartLabels = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const weeklyViewChartLabels = [
  "Poniedziałek",
  "Wtorek",
  "Środa",
  "Czwartek",
  "Piątek",
  "Sobota",
  "Niedziela",
];

const monthLabels = ["01-07", "08-14", "15-21", "22-28", "29-31"];

const yearlyViewChartLabels = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

function useMainChart() {
  const { segmentData } = useDataState();
  const dispatch = useDataDispatch();
  const { chartColors } = useChart();
  const { getFilteredData } = useFilters();

  const getLabels = (segment: SegmentType) => {
    const view = segmentData[segment].view;

    switch (view) {
      case "daily":
        return dailyViewChartLabels;
      case "weekly":
        return weeklyViewChartLabels;

      case "monthly":
        return monthLabels;
      case "yearly":
        return yearlyViewChartLabels;

      default:
        return dailyViewChartLabels;
    }
  };

  const getChartTitle = (segment: SegmentType) => {
    const d = segmentData[segment].mainChart.currentDate;
    const view = segmentData[segment].view;
    const { getFilteredData } = useFilters();

    switch (view) {
      case "daily":
        const day = d.getDay();
        const specificDate = formatDate(d);

        // sunday is 0, but we want it to be 6
        const dayNumber = day === 0 ? 6 : day - 1;
        return `${weeklyViewChartLabels[dayNumber]} (${specificDate})`;

      case "weekly":
        const fromDate = d;
        const toDate = new Date(d);

        toDate.setDate(toDate.getDate() + 6);

        const from = formatDate(fromDate);
        const to = formatDate(toDate);

        return `${from} do ${to}`;

      case "monthly":
        const month = d.getMonth();

        return yearlyViewChartLabels[month];

      case "yearly":
        return d.getFullYear().toString();

      default:
        return null;
    }
  };

  const handleNextButtonClick = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;

    switch (view) {
      case "daily":
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: tomorrow,
        });

      case "weekly":
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(nextWeek.getDate() + 7);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: nextWeek,
        });

      case "monthly":
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: nextMonth,
        });

      case "yearly":
        const nextYear = new Date(currentDate);
        nextYear.setFullYear(nextYear.getFullYear() + 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: nextYear,
        });
    }
  };

  const handlePrevButtonClick = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;

    switch (view) {
      case "daily":
        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: yesterday,
        });

      case "weekly":
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(prevWeek.getDate() - 7);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: prevWeek,
        });

      case "monthly":
        const prevMonth = new Date(currentDate);
        prevMonth.setMonth(prevMonth.getMonth() - 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: prevMonth,
        });

      case "yearly":
        const prevYear = new Date(currentDate);
        prevYear.setFullYear(prevYear.getFullYear() - 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: prevYear,
        });
    }
  };

  const prevButtonDisabled = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;
    const minDate = segmentData[segment].dateFrom;

    switch (view) {
      case "daily":
        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);

        return yesterday < minDate;

      case "weekly":
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(prevWeek.getDate() - 7);

        return prevWeek < minDate;

      case "monthly":
        const d = new Date(currentDate);
        d.setMonth(d.getMonth() - 1);

        const prevMonth = d.getMonth();
        const minMonth = minDate.getMonth();

        return prevMonth < minMonth;

      case "yearly":
        const prevYear = new Date(currentDate);
        prevYear.setFullYear(prevYear.getFullYear() - 1);

        const minYear = minDate.getFullYear();

        return prevYear.getFullYear() < minYear;
    }
  };

  const nextButtonDisabled = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;
    const maxDate = segmentData[segment].dateTo;

    switch (view) {
      case "daily":
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return tomorrow > maxDate;

      case "weekly":
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(nextWeek.getDate() + 7);

        return nextWeek > maxDate;

      case "monthly":
        const d = new Date(currentDate);
        d.setMonth(d.getMonth() + 1);

        const nextMonth = d.getMonth();
        const maxMonth = maxDate.getMonth();

        return nextMonth > maxMonth;

      case "yearly":
        const nextYear = new Date(currentDate);
        nextYear.setFullYear(nextYear.getFullYear() + 1);

        const maxYear = maxDate.getFullYear();

        return nextYear.getFullYear() > maxYear;
    }
  };

  const getMainChartData = (
    labelNames: string[],
    labels: string[],
    data: number[][]
  ) => {
    const datasets = data.map((item, index) => ({
      label: labelNames[index],
      data: item.map((item) => item),
      backgroundColor: chartColors[index],
      borderColor: chartColors[index],
    }));

    return {
      labels,
      datasets,
    };
  };

  const getMainChartDatasets = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;
    const dateFrom = segmentData[segment].dateFrom;
    const dateTo = segmentData[segment].dateTo;
    const data = getFilteredData(dateFrom, dateTo);

    if (view === "daily") {
      const currentDayData = getDayData(currentDate, data);

      const datasets: number[][] = currentDayData.map((item) => {
        const itemArray: number[] = [
          0, //06:00
          0, //07:00
          0, //08:00
          0, //09:00
          0, //10:00
          0, //11:00
          0, //12:00
          0, //13:00
          0, //14:00
          0, //15:00
          0, //16:00
          0, //17:00
          0, //18:00
          0, //19:00
        ];

        item.data.map((item) => {
          if (item.date) {
            const itemHour = new Date(item.date).getHours();

            if (itemHour >= 6 && itemHour <= 19) {
              itemArray[itemHour - 6] += 1;
            }
          }
        });

        return itemArray;
      });

      return datasets;
    }

    if (view === "weekly") {
      //TODO
    }

    if (view === "monthly") {
      //TODO
    }

    if (view === "yearly") {
      //TODO
    }

    return [];
  };

  return {
    getLabels,
    getChartTitle,
    handlePrevButtonClick,
    handleNextButtonClick,
    prevButtonDisabled,
    nextButtonDisabled,
    getMainChartData,
    getMainChartDatasets,
  };
}

export { useMainChart };
