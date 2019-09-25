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
        <li className={props.location.pathname === '/transactions' ? 'active' : undefined}>
          <Link to="/transactions">
            <i className="fa fa-file-invoice-dollar"></i>
            Transactions
          </Link>
        </li>
        <li className={props.location.pathname === '/report' ? 'active' : undefined}>
          <Link to="/report">
            <i className="fa fa-chart-pie"></i>
            Report
          </Link>
        </li>
        <li className={props.location.pathname === '/settings' ? 'active' : undefined}>
          <Link to="/settings">
            <i className="fa fa-cog"></i>
            {/* import, export, view all categoris with unarchive method */}
            Settings 
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Sidebar)