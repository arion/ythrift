import React, { FC }  from 'react'
import { Link, withRouter, RouteComponentProps } from "react-router-dom"

import cn from 'classnames'

interface IProps {
  navToggle: boolean;
}
const Navigation: FC<IProps & RouteComponentProps<{}>> = (props) => {
  return (
    <nav className={cn('side-navbar', { 'shrinked': props.navToggle })}>
      <ul className="list-unstyled">
        <li className={props.location.pathname === '/' ? 'active' : undefined}>
          <Link to="/">
            <i className="fa fa-home"></i>
            Home
          </Link>
        </li>
        <li className={props.location.pathname === '/users' ? 'active' : undefined}>
          <Link to="/users">
            <i className="fa fa-users"></i>
            Users
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Navigation)