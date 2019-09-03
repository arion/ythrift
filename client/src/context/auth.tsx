import React from 'react'
import { IUser, AuthContextProps } from '../utils/interfaces'
import { getJson } from '../utils/fetch'

interface IState {
  loaded: boolean;
  currentUser: IUser | null;
};

const AuthContext = React.createContext<Partial<AuthContextProps>>({});

const fakeUser = {id: 1, username: 'Denis', email: 'mearion@gmail.com'};

class AuthProvider extends React.Component<{}, IState> {
  state: IState = {
    currentUser: null,
    loaded: false
  }

  componentDidMount() {
    getJson('/api/v1/account').then((user) => this.setState({ currentUser: user })).finally(() => this.setState({ loaded: true }))
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}



export const Consumer = AuthContext.Consumer
export const Provider = AuthProvider
