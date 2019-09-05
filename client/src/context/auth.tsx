import React, { useState, createContext, useEffect, FC, Dispatch } from 'react'
import { IUser } from '../utils/interfaces'
import { getJson } from '../utils/fetch'
import { Redirect } from "react-router-dom"

interface IAuthContext {
  currentUser: IUser | undefined,
  setCurrentUser: Dispatch<IUser | undefined>,
  loaded: boolean,
}

export const Context = createContext<IAuthContext>({
  currentUser: undefined,
  setCurrentUser: () => null,
  loaded: false
});

const AuthProvider: FC<{}> = (props) => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [redirecting, setRedirecting] = useState<boolean>(false)

  useEffect(() => {
    if (loaded) { return }
    getJson('/api/v1/account')
      .then(setCurrentUser)
      .finally(() => setLoaded(true))
      .catch(() => setRedirecting(true))
  }, [loaded])

  if (redirecting) { return <Redirect to="/" /> }

  return (
    <Context.Provider
      value={{currentUser, setCurrentUser, loaded}}
    >
      {props.children}
    </Context.Provider>
  )
}

export const Provider = AuthProvider
