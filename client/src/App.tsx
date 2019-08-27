import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

import * as Auth from './context/auth'

import LandingPage from './pages/landing'
import UsersPage from './pages/users'

const App: React.FC = () => {
  return (
    <Auth.Provider>
      <Auth.Consumer>
        {auth => (
          auth.fetchUser!() && auth.currentUser && (
            <Router>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/users">Users</Link>
                  </li>
                  <li>
                    <a role='button' onClick={() => auth.logOut!()}>Logout {auth.currentUser.username}</a>
                  </li>
                  <li>
                    <a href="/auth/google">Sign In with Google</a>
                  </li>
                </ul>
              </nav>

              <Route path="/" exact component={LandingPage} />
              <Route path="/users" component={UsersPage} />
            </Router>
          ) || (
            <a href="/auth/google">Sign In with Google</a>
          )
        )}
      </Auth.Consumer>
    </Auth.Provider>
  )
}

export default App
