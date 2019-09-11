import React, { useContext, FC, SetStateAction, Dispatch }  from 'react'

import cn from 'classnames'

import * as Store from '../context/store'

interface IProps {
  setNavToggle: Dispatch<SetStateAction<boolean>>,
  navToggle: boolean
}

const HeaderNavigation: FC<IProps> = (props) => {
  const { currentUser } = useContext(Store.AuthCotext)

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-holder d-flex align-items-center justify-content-between">
            {/* <!-- Navbar Header--> */}
            <div className="navbar-header">
              {/* <!-- Toggle Button--> */}
              <a id="toggle-btn" tabIndex={0} className={cn('menu-btn', { 'active' : !props.navToggle })} onClick={() => props.setNavToggle(!props.navToggle)}>
                <span></span><span></span><span></span>
              </a>
              {/* <!-- Navbar Brand --> */}
              <a href="index.html" className="navbar-brand d-none d-sm-inline-block">
                <div className="brand-text d-none d-lg-inline-block"><span>y</span><strong>Thrift</strong></div>
                <div className="brand-text d-none d-sm-inline-block d-lg-none"><strong>BD</strong></div
              ></a>
            </div>
            {/* <!-- Navbar Menu --> */}
            <ul className="nav-menu list-unstyled d-flex flex-md-row align-items-md-center">
              {/* <!-- Login    --> */}
              { !currentUser && (
                <li className="nav-item">
                  <a href="/auth/google" className="nav-link login">
                    <span className="d-none d-sm-inline">Sign In with Google</span>
                    &nbsp;
                    <i className="fa fa-sign-in-alt"></i>
                  </a>
                </li>
              ) }
              {/* <!-- Logout    --> */}
              { currentUser && (
                <li className="nav-item">
                  <a href="/auth/logout" className="nav-link logout">
                    <span className="d-none d-sm-inline">Logout</span>
                    &nbsp;
                    <i className="fa fa-sign-out-alt"></i>
                  </a>
                </li>
              ) }
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default HeaderNavigation