import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import * as Store from './context/store'

import PrivateRoute from './components/private_route'
import Navigation from './components/navigation'

import LandingPage from './pages/landing'
import UsersPage from './pages/users'

const App: React.FC = () => {
  return (
    <Router>
      <Store.Context>
        <Navigation></Navigation>
        <Route path="/" exact component={LandingPage} />
        <PrivateRoute path="/users" component={UsersPage} />
      </Store.Context>
    </Router>
  )
}

export default App
