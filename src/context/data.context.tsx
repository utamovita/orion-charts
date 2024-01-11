import React, { useContext, useReducer } from "react";
import {
  RecordType,
  SegmentType,
  SortType,
  ViewType,
} from "../types/DataTypes.type";
import { getDateRange, sumDatesByData } from "src/helpers/date";
import { getUniqueNames } from "src/helpers/data";

type State = {
  globalMinDate: Date;
  globalMaxDate: Date;
  globalData: RecordType[];
  sort: SortType;
  filterSelection: string[];
  segmentData: {
    [key in SegmentType]: {
      selectedDateFrom: Date;
      selectedDateTo: Date;
      dateFrom: Date;
      dateTo: Date;
      view: ViewType;
      mainChart: {
        currentDate: Date;
      };
    };
  };
};

type Action =
  | {
      type: "ADD_GLOBAL_DATA";
      data: RecordType[];
    }
  | {
      type: "UPDATE_DATE_RANGE";
      dateFrom: Date;
      dateTo: Date;
      segment: SegmentType;
    }
  | {
      type: "UPDATE_SELECTED_DATE_RANGE";
      dateFrom: Date;
      dateTo: Date;
      segment: SegmentType;
    }
  | {
      type: "UPDATE_SORTING";
      sort: SortType;
    }
  | {
      type: "UPDATE_VIEW";
      view: ViewType;
      segment: SegmentType;
    }
  | {
      type: "UPDATE_FILTER_SELECTION";
      checked: boolean;
      name: string;
    }
  | {
      type: "UPDATE_CURRENT_DATE";
      currentDate: Date;
      segment: SegmentType;
    };

type Dispatch = (action: Action) => void;

export const DataStateContext = React.createContext<State | undefined>(
  undefined
);

export const DataDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_GLOBAL_DATA": {
      const allDates = sumDatesByData(action.data);
      const { min, max } = getDateRange(allDates);

      const defaultValues = {
        selectedDateFrom: min,
        selectedDateTo: max,
        dateFrom: min,
        dateTo: max,
        view: "daily",
        mainChart: {
          currentDate: min,
        },
      } as const;

      const updatedSegmentData = {
        totalCalls: defaultValues,
        averageCallAmount: defaultValues,
      };

      const uniqueNames = getUniqueNames(action.data);

      return {
        ...state,
        filterSelection: uniqueNames,
        segmentData: updatedSegmentData,
        globalData: action.data,
        globalMinDate: min,
        globalMaxDate: max,
      };
    }

    case "UPDATE_DATE_RANGE":
      return {
        ...state,
        segmentData: {
          ...state.segmentData,
          [action.segment]: {
            ...state.segmentData[action.segment],
            dateFrom: action.dateFrom,
            dateTo: action.dateTo,
          },
        },
      };

    case "UPDATE_SELECTED_DATE_RANGE":
      return {
        ...state,
        segmentData: {
          ...state.segmentData,
          [action.segment]: {
            ...state.segmentData[action.segment],
            selectedDateFrom: action.dateFrom,
            selectedDateTo: action.dateTo,
            mainChart: {
              currentDate: action.dateFrom,
            },
          },
        },
      };

    case "UPDATE_SORTING":
      return {
        ...state,
        sort: action.sort,
      };

    case "UPDATE_VIEW":
      return {
        ...state,
        segmentData: {
          ...state.segmentData,
          [action.segment]: {
            ...state.segmentData[action.segment],
            dateFrom: state.globalMinDate,
            dateTo: state.globalMaxDate,
            selectedDateFrom: state.globalMinDate,
            selectedDateTo: state.globalMaxDate,
            view: action.view,
            mainChart: {
              currentDate: state.globalMinDate,
            },
          },
        },
      };
    case "UPDATE_CURRENT_DATE":
      return {
        ...state,
        segmentData: {
          ...state.segmentData,
          [action.segment]: {
            ...state.segmentData[action.segment],
            mainChart: {
              ...state.segmentData[action.segment].mainChart,
              currentDate: action.currentDate,
            },
          },
        },
      };

    case "UPDATE_FILTER_SELECTION":
      if (!action.checked) {
        return {
          ...state,
          filterSelection: state.filterSelection.filter(
            (item) => item !== action.name
          ),
        };
      }

      // checked === true
      return {
        ...state,
        filterSelection: [...state.filterSelection, action.name],
      };

    default:
      throw new Error();
  }
}

type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  const defaultSegmentValues = {
    selectedDateFrom: new Date(),
    selectedDateTo: new Date(),
    dateFrom: new Date(),
    dateTo: new Date(),
    view: "daily",
    mainChart: {
      currentDate: new Date(),
    },
  } as const;

  const defaultState: State = {
    globalData: [],
    globalMinDate: new Date(),
    globalMaxDate: new Date(),
    sort: "desc",
    filterSelection: [],
    segmentData: {
      totalCalls: defaultSegmentValues,
      averageCallAmount: defaultSegmentValues,
    },
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};

function useDataState() {
  const context = useContext(DataStateContext);
  if (context === undefined) {
    throw new Error("useDataState must be used within a DataProvider");
  }
  return context;
}

function useDataDispatch() {
  const context = useContext(DataDispatchContext);
  if (context === undefined) {
    throw new Error("useDataDispatch must be used within a DataProvider");
  }
  return context;
}

export { DataProvider, useDataState, useDataDispatch };
