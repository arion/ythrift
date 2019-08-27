import React from 'react'
import { IUser } from '../utils/interfaces'

interface AuthContextProps { 
  currentUser: IUser | null
  fetchUser: () => boolean
  logOut: () => void
};

interface IState {
  currentUser: IUser | null
};

const AuthContext = React.createContext<Partial<AuthContextProps>>({});

const fakeUser = {id: 1, username: 'Denis', email: 'mearion@gmail.com'};

class AuthProvider extends React.Component<{}, IState> {
  state: IState = {
    currentUser: null
  }

  fetchUser = () => {
    if (this.state.currentUser) { return true }
    // TODO: make this async with check on server side
    this.setState({currentUser: fakeUser})
    return true
  }

  logOut = () => {
    this.setState({currentUser: null})
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          fetchUser: this.fetchUser,
          logOut: this.logOut
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}



export const Consumer = AuthContext.Consumer
export const Provider = AuthProvider
