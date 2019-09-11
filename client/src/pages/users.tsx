import React, { Component } from 'react'
import { map } from 'lodash'
import { IUser } from '../utils/interfaces'
import { getJson } from '../utils/fetch'

interface IState {
  users: IUser[]
}

class UsersPage extends Component<{}, IState> {
  state: IState = {
    users: [] as IUser[]
  }

  componentDidMount() {
    getJson('/api/v1/users').then((users) => this.setState({ users }))
  }

  render() {
    const { users } = this.state

    return (
      <div>
        <header className="page-header">
          <div className="container-fluid">
            <h2 className="no-margin-bottom">Users page</h2>
          </div>
        </header>
        <section>
          {map(users, (user) => (
            <p key={user.id}>
              {user.id} - {user.username}
            </p>
          ))}
        </section>
      </div>
    )
  }
}

export default UsersPage