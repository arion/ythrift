import React, { FC } from 'react'
import { Link, withRouter, RouteComponentProps } from "react-router-dom"

import cn from 'classnames'

import { useGlobalState } from '../utils/state'

const Sidebar: FC<RouteComponentProps<{}>> = (props) => {
  const { navToggle, month, year } = useGlobalState('common')
  
  return (
    <nav className={cn('side-navbar', { 'shrinked': navToggle })}>
      <ul className="list-unstyled">
        <li className={props.location.pathname === '/' ? 'active' : undefined}>
          <Link to="/">
            <i className="fa fa-home"></i>
            Landing
          </Link>
        </li>
        <li className={props.location.pathname === '/dashboard' ? 'active' : undefined}>
          <Link to={`/dashboard?month=${month}&year=${year}`}>
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

export default withRouter(Sidebar)