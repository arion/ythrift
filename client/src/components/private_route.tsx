import React, { StatelessComponent, ComponentType } from "react"
import { Redirect, Route } from "react-router-dom"

import { useGlobalState } from '../utils/state'

interface IProps {
  path: string;
  component: ComponentType<any>;
}

const PrivateRoute: StatelessComponent<IProps> = ({component: Component, ...rest}) => {
  const { user: currentUser, loaded } = useGlobalState('account')

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