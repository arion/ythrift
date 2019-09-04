import React from 'react'

import * as Auth from './auth'

export const Context: React.FC<{}> = (props) => {
  return (
    <Auth.Provider>
      {props.children}
    </Auth.Provider>
  )
}

export const AuthCotext = Auth.Context
