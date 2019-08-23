import React from 'react';
import { map } from 'lodash';

interface IUser {
  id: number,
  username: string,
  email: string
}

interface IState {
  users: IUser[];
}

const callApi = async (url: string) => {
  const response = await fetch(url);
  const body = await response.json();
  if (response.status !== 200) throw Error(body.message);

  return body.data as IUser[];
}

class UsersList extends React.Component<{}, IState> {
  state: IState = {
    users: [] as IUser[]
  }

  componentDidMount() {
    callApi('/api/v1/users').then((users) => this.setState({ users }))
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
    );
  }
}

export default UsersList;