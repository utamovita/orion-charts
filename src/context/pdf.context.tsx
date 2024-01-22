import React, { useContext, useReducer } from "react";

type RefType = React.RefObject<HTMLDivElement> | null;

type State = {
  ref: RefType,
  isPrintView: boolean;
};

type Action =
  | {
    type: "UPDATE_REF";
    payload: {
      ref: RefType
    };
  }
  | {
    type: "UPDATE_PRINT_VIEW";
    payload: {
      isPrintView: boolean;
    };
  };

type Dispatch = (action: Action) => void;

export const PdfStateContext = React.createContext<State | undefined>(
  undefined,
);
export const PdfDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

type PdfProviderProps = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "UPDATE_REF":
      return {
        ...state,
        ref: action.payload.ref,
      };

    case "UPDATE_PRINT_VIEW":
      return {
        ...state,
        isPrintView: action.payload.isPrintView,
      };
    default:
      throw new Error();
  }
}

const PdfProvider = ({ children }: PdfProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    ref: null,
    isPrintView: false,
  });

  return (
    <PdfStateContext.Provider value={state}>
      <PdfDispatchContext.Provider value={dispatch}>
        {children}
      </PdfDispatchContext.Provider>
    </PdfStateContext.Provider>
  );
};

function usePdfState() {
  const context = useContext(PdfStateContext);
  if (context === undefined) {
    throw new Error("usePdfState must be used within a PdfProvider");
  }
  return context;
}

function usePdfDispatch() {
  const context = useContext(PdfDispatchContext);
  if (context === undefined) {
    throw new Error("usePdfDispatch must be used within a PdfProvider");
  }
  return context;
}

export { PdfProvider, usePdfState, usePdfDispatch };