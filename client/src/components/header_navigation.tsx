import React, { FC }  from 'react'

import cn from 'classnames'

import { useDispatch, useGlobalState } from '../utils/state'

const HeaderNavigation: FC = () => {
  const dispatch = useDispatch()
  const { navToggle } = useGlobalState('common')
  const { user: currentUser } = useGlobalState('account')

  const setNavToggle = () => dispatch({ type: 'common-navToggle' })

  return (
    <header className="header">
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-holder d-flex align-items-center justify-content-between">
            {/* <!-- Navbar Header--> */}
            <div className="navbar-header">
              {/* <!-- Toggle Button--> */}
              <button className={cn('menu-btn', { 'active' : !navToggle })} onClick={setNavToggle}>
                <span></span><span></span><span></span>
              </button>
              {/* <!-- Navbar Brand --> */}
              <a href="index.html" className="navbar-brand d-none d-sm-inline-block">
                <div className="brand-text d-none d-lg-inline-block"><span>y</span><strong>Thrift</strong></div>
                <div className="brand-text d-none d-sm-inline-block d-lg-none"><strong>yT</strong></div>
              </a>
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