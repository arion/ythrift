import * as React from "react"
import { AuthContextProps } from '../utils/interfaces'
import { Redirect, Route } from "react-router-dom"

interface IProps {
  path: string;
  auth: Partial<AuthContextProps>;
  component: React.ComponentType<any>;
}

const PrivateRoute: React.StatelessComponent<IProps> = ({component: Component, auth, ...rest}) => {
  if (!auth.loaded) { return (<div></div>) }

  return (
    <Route
      {...rest}
      render={(props) => auth.currentUser
        ? <Component {...props} />
        : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
    />
  )
}

export default PrivateRoute