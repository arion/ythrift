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
            Landing
          </Link>
        </li>
        <li className={props.location.pathname === '/dashboard' ? 'active' : undefined}>
          <Link to="/dashboard">
            <i className="fa fa-money-bill-alt"></i>
            Dashboard
          </Link>
        </li>
        <li className={props.location.pathname === '/reports' ? 'active' : undefined}>
          <Link to="/reports">
            <i className="fa fa-chart-pie"></i>
            Reports
          </Link>
        </li>
        <li className={props.location.pathname === '/settings' ? 'active' : undefined}>
          <Link to="/settings">
            <i className="fa fa-cog"></i>
            Settings
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Navigation)