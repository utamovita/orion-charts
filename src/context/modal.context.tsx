import React, { useContext, useReducer } from "react";

type PayloadTypes = null | string | React.ReactNode;

type State = {
  isActive: boolean;
  content: PayloadTypes;
};

type Action =
  | {
    type: "SHOW";
    payload: {
      content: PayloadTypes;
    };
  }
  | {
    type: "HIDE";
  };

type Dispatch = (action: Action) => void;

export const ModalStateContext = React.createContext<State | undefined>(
  undefined,
);
export const ModalDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

type ModalProviderProps = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SHOW":
      return {
        isActive: true,
        content: action.payload.content,
      };
    case "HIDE":
      return {
        isActive: false,
        content: null,
      };
    default:
      throw new Error();
  }
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    isActive: false,
    content: null,
  });

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

function useModalState() {
  const context = useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error("useModalState must be used within a ModalProvider");
  }
  return context;
}

function useModalDispatch() {
  const context = useContext(ModalDispatchContext);
  if (context === undefined) {
    throw new Error("useModalDispatch must be used within a ModalProvider");
  }
  return context;
}

export { ModalProvider, useModalState, useModalDispatch };