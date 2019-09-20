import React, { useReducer, createContext, useEffect, FC } from 'react'
import { IUser } from '../utils/interfaces'
import { loadCurrentUser } from '../utils/api'
import { Redirect } from "react-router-dom"

interface IState {
  currentUser: IUser | undefined,
  loaded: boolean,
  redirecting: boolean,
}

interface IAction {
  type: String,
  user?: IUser | undefined,
}

function reducer(state: IState, action : IAction) {
  switch (action.type) {
    case 'loading':
      return { ...state, currentUser: undefined, loaded: false }
    case 'loaded':
      return { ...state, currentUser: action.user, loaded: true }
    case 'failure':
      return { ...state, redirecting: true, loaded: true }
    default:
      throw new Error()
  }
}

export const Context = createContext<IState>({
  currentUser: undefined,
  loaded: false,
  redirecting: false
})

const AuthProvider: FC<{}> = (props) => {
  const initialState = {
    currentUser: undefined,
    loaded: false,
    redirecting: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.loaded) { return }
    loadCurrentUser()
      .then((user) => dispatch({ type: 'loaded', user: user }))
      .catch(() => dispatch({ type: 'failure' }))
  }, [state.loaded])

  if (state.redirecting && window.location.pathname !== '/') { return <Redirect to="/" /> }

  return (
    <Context.Provider value={state}>
      {props.children}
    </Context.Provider>
  )
}

export const Provider = AuthProvider
