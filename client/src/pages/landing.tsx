import React, { useContext } from 'react'

import * as Store from '../context/store'

const LandingPage: React.FC = () => {
  const { currentUser } = useContext(Store.AuthCotext)

  return (
    <div>
      <h2>This is a landing page!</h2>
      {currentUser && (
        <h4>Hellow, {currentUser.username}!</h4>
      ) || (
        <a href="/auth/google">Sign In with Google</a>
      )}
    </div>
  )
}

export default LandingPage
