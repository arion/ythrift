import * as React from 'react'

import { IAction, initialState, reducer, IState } from './reducer'

const { createContext, useContext, useReducer } = React

const stateCtx = createContext(initialState)
const dispatchCtx = createContext((() => 0) as React.Dispatch<IAction>)

export const Provider: React.ComponentType = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <dispatchCtx.Provider value={dispatch}>
      <stateCtx.Provider value={state}>
        {children}
      </stateCtx.Provider>
    </dispatchCtx.Provider>
  )
}

export const useDispatch = () => {
  return useContext(dispatchCtx)
}

export const useGlobalState = <K extends keyof IState>(property: K) => {
  const state = useContext(stateCtx)
  return state[property]
};