import React, { useState } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import cn from 'classnames'

import * as Store from './context/store'

import PrivateRoute from './components/private_route'
import Navigation from './components/navigation'

import LandingPage from './pages/landing'
import UsersPage from './pages/users'

const App: React.FC = () => {
  const [navToggle, setNavToggle] = useState(false)

  return (
    <Router>
      <Store.Context>
        <div className={cn('page-wrapper', { 'toggled': navToggle })}>
          <Navigation setNavToggle={setNavToggle}></Navigation>
          <main className="page-content">
            <Route path="/" exact component={LandingPage} />
            <PrivateRoute path="/users" component={UsersPage} />
          </main>
        </div>
      </Store.Context>
    </Router>
  )
}

export default App
