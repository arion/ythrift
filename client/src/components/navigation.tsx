import React, { useContext, FC, SetStateAction, Dispatch }  from 'react'
import { Link } from "react-router-dom"

import * as Store from '../context/store'
import '../stylesheets/navigation.css'

interface IProps {
  setNavToggle: Dispatch<SetStateAction<boolean>>,
}

const Navigation: FC<IProps> = (props) => {
  const { currentUser } = useContext(Store.AuthCotext)

  return (
    <div className="chiller-theme">
      <button id="show-sidebar" className="btn btn-sm btn-dark" onClick={() => props.setNavToggle(true)}>
        <i className="fas fa-bars"></i>
      </button>
      <nav id="sidebar" className="sidebar-wrapper">
        <div className="sidebar-content">
          <div className="sidebar-brand">
            <Link to="/">yThrift</Link>
            <div id="close-sidebar" onClick={() => props.setNavToggle(false)}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className="sidebar-menu">
            <ul>
              <li>
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
              {currentUser && (
                <li>
                  <a href="/auth/logout">
                    <i className="fa fa-sign-out-alt"></i>
                    Logout {currentUser.username}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navigation