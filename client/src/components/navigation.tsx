import React, { useContext, FC }  from 'react'
import { Link } from "react-router-dom"

import * as Store from '../context/store'

const Navigation: FC = () => {
  const { currentUser } = useContext(Store.AuthCotext)

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        {currentUser && (
          <li>
            <a href="/auth/logout">Logout {currentUser.username}</a>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navigation