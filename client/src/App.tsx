import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import * as Auth from './context/auth'

import PrivateRoute from './utils/private_route'

import LandingPage from './pages/landing'
import UsersPage from './pages/users'

const App: React.FC = () => {
  return (
    <Router>
      <Auth.Provider>
        <Auth.Consumer>
          {auth => (
            <React.Fragment>
              {auth.currentUser && (
                <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/users">Users</Link>
                    </li>
                    <li>
                      <a href="/auth/logout">Logout {auth.currentUser.username}</a>
                    </li>
                  </ul>
                </nav>
              ) || (
                <a href="/auth/google">Sign In with Google</a>
              )}
              <Route path="/" exact component={LandingPage} />
              <PrivateRoute path="/users" component={UsersPage} auth={auth} />
            </React.Fragment>
          )}
        </Auth.Consumer>
      </Auth.Provider>
    </Router>
  )
}

export default App
