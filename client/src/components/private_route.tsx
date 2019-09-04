import React, { useContext, StatelessComponent, ComponentType } from "react"
import { Redirect, Route } from "react-router-dom"

import * as Store from '../context/store'

interface IProps {
  path: string;
  component: ComponentType<any>;
}

const PrivateRoute: StatelessComponent<IProps> = ({component: Component, ...rest}) => {
  const { currentUser, loaded } = useContext(Store.AuthCotext)

  if (!loaded) { return (<div></div>) }

  return (
    <Route
      {...rest}
      render={(props) => currentUser
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

export default PrivateRoute