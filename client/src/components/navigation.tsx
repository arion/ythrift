import React, { useContext, FC, SetStateAction, Dispatch }  from 'react'
import { Link } from "react-router-dom"

import cn from 'classnames'

interface IProps {
  navToggle: boolean,
}

const Navigation: FC<IProps> = (props) => {

  return (
    <nav className={cn('side-navbar', { 'shrinked': props.navToggle })}>
      <ul className="list-unstyled">
        <li className="active">
          <Link to="/">
            <i className="fa fa-home"></i>
            Home
          </Link>
        </li>
        <li>
          <Link to="/users">
            <i className="fa fa-users"></i>
            Users
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation