import React, { createContext, FC, useContext, useReducer, Dispatch } from 'react';

export interface SampleContextModel {
  sharedValue: string;
  volume: string;
}

interface CtxAction {
  name: keyof SampleContextModel;
  value: string;
}

function getInitState(): SampleContextModel {
  return {
    sharedValue: '',
    volume: '',
  };
}

function reducer(state: SampleContextModel, action: CtxAction): SampleContextModel {
  return {
    ...state,
    [action.name]: action.value
  };
}

const SampleDispatchContext = createContext<Dispatch<CtxAction>>(() => { });
const SampleStateContext = createContext(getInitState());

const DispatchCtxProvider = SampleDispatchContext.Provider;
const StateCtxProvider = SampleStateContext.Provider;

export const SampleContextProvider: FC = ({ children }) => {
  const [
    state,
    dispatch
  ] = useReducer(reducer, getInitState());

  return (
    <DispatchCtxProvider value={dispatch}>
      <StateCtxProvider value={state}>
        {children}
      </StateCtxProvider>
    </DispatchCtxProvider>
  );
}

export const useSampleContext = () => {
  const dispatch = useContext(SampleDispatchContext);
  const state = useContext(SampleStateContext);

  return [
    state,
    dispatch,
  ];
};
