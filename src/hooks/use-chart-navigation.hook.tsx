
import { useDataDispatch, useDataState } from "src/context/data.context";
import { SegmentType } from "src/types/DataTypes.type";

function useChartNavigation() {
  const dispatch = useDataDispatch();
  const { segmentData } = useDataState();

  const handleNextButtonClick = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;

    switch (view) {
      case "daily": {
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: tomorrow,
        });
      }

      case "weekly": {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(nextWeek.getDate() + 7);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: nextWeek,
        });
      }

      case "monthly": {
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: nextMonth,
        });
      }

      case "yearly": {
        const nextYear = new Date(currentDate);
        nextYear.setFullYear(nextYear.getFullYear() + 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: nextYear,
        });
      }
    }
  };

  const handlePrevButtonClick = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;

    switch (view) {
      case "daily": {
        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: yesterday,
        });
      }

      case "weekly": {
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(prevWeek.getDate() - 7);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: prevWeek,
        });
      }

      case "monthly": {
        const prevMonth = new Date(currentDate);
        prevMonth.setMonth(prevMonth.getMonth() - 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: prevMonth,
        });
      }

      case "yearly": {
        const prevYear = new Date(currentDate);
        prevYear.setFullYear(prevYear.getFullYear() - 1);

        return dispatch({
          type: "UPDATE_CURRENT_DATE",
          segment,
          currentDate: prevYear,
        });
      }
    }
  };

  const prevButtonDisabled = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;
    const minDate = segmentData[segment].dateFrom;

    switch (view) {
      case "daily": {
        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);

        return yesterday < minDate;
      }

      case "weekly": {
        const prevWeek = new Date(currentDate);
        //TODO: let scroll to week before minDate
        prevWeek.setDate(prevWeek.getDate() - 2);

        return prevWeek < minDate;
      }

      case "monthly": {
        const date = new Date(currentDate);
        date.setMonth(date.getMonth() - 1);

        const prevMonth = date.getMonth();
        const minMonth = minDate.getMonth();

        return prevMonth < minMonth;
      }

      case "yearly": {
        const prevYear = new Date(currentDate);
        prevYear.setFullYear(prevYear.getFullYear() - 1);

        const minYear = minDate.getFullYear();

        return prevYear.getFullYear() < minYear;
      }
    }
  };

  const nextButtonDisabled = (segment: SegmentType) => {
    const view = segmentData[segment].view;
    const currentDate = segmentData[segment].mainChart.currentDate;
    const maxDate = segmentData[segment].dateTo;

    switch (view) {
      case "daily": {
        const tomorrow = new Date(currentDate);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return tomorrow > maxDate;
      }
      case "weekly": {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(nextWeek.getDate() + 7);

        return nextWeek > maxDate;
      }
      case "monthly": {
        const today = new Date(currentDate);
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        const maxMonth = maxDate.getMonth();
        const maxYear = maxDate.getFullYear();

        if (todayYear > maxYear) {
          return true;
        }

        if (todayYear === maxYear) {
          return todayMonth >= maxMonth;
        }

        return false;
      }
      case "yearly": {
        const nextYear = new Date(currentDate);
        nextYear.setFullYear(nextYear.getFullYear() + 1);

        const maxYear = maxDate.getFullYear();

        return nextYear.getFullYear() > maxYear;
      }
    }
  };

  return {
    prevButtonDisabled,
    nextButtonDisabled,
    handlePrevButtonClick,
    handleNextButtonClick
  }
}

export { useChartNavigation }