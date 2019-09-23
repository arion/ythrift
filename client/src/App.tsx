import React, { FC } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import { Provider} from './utils/state'

import PrivateRoute from './components/private_route'
import HeaderNavigation from './components/header_navigation'
import Sidebar from './components/sidebar'
import ContentInner from './components/content_inner'

import LandingPage from './pages/landing'
import DashboardPage from './pages/dashboard'

import './stylesheets/custom.css'
import './stylesheets/style.default.css'

const App: FC = () => {
  return (
    <Router>
      <Provider>
        <HeaderNavigation/>
        <div className="page-content d-flex align-items-stretch"> 
          <Sidebar/>
          <ContentInner>
            <Route path="/" exact component={LandingPage} />
            <PrivateRoute path="/dashboard" component={DashboardPage} />
          </ContentInner>
        </div>
      </Provider>
    </Router>
  )
}

export default App
