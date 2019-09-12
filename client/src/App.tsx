import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import cn from 'classnames'

import * as Store from './context/store'

import PrivateRoute from './components/private_route'
import HeaderNavigation from './components/header_navigation'
import Navigation from './components/navigation'

import LandingPage from './pages/landing'
import DashboardPage from './pages/dashboard'

import './stylesheets/custom.css'
import './stylesheets/style.default.css'

const App: React.FC = () => {
  const [navToggle, setNavToggle] = useState(false)

  return (
    <Router>
      <Store.Context>
        <HeaderNavigation setNavToggle={setNavToggle} navToggle={navToggle}/>
        <div className="page-content d-flex align-items-stretch"> 
          <Navigation navToggle={navToggle}></Navigation>
          <div className={cn('content-inner', { 'active': navToggle })}>
            <Route path="/" exact component={LandingPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
          </div>
        </div>
      </Store.Context>
    </Router>
  )
}

export default App
