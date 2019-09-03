import React from 'react'
import { map } from 'lodash'
import { IUser } from '../utils/interfaces'
import { getJson } from '../utils/fetch'

interface IState {
  users: IUser[]
}

class UsersPage extends React.Component<{}, IState> {
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
        {map(users, (user) => (
          <p key={user.id}>
            {user.id} - {user.username}
          </p>
        ))}
      </div>
    )
  }
}

export default UsersPage