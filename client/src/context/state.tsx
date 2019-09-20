import React, { FC, createContext, useContext, useReducer } from 'react'

interface IProps {
  reducer: () => void;
  initialState: any;
}

export const StateContext = createContext<any>({});

export const StateProvider: FC<IProps> = (props) => (
  <StateContext.Provider value={useReducer(props.reducer, props.initialState)}>
    { props.children }
  </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext);
