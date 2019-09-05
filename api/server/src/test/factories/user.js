import faker from 'faker';

import models from '../../models';

const data = async (props = {}) => {
  const email = faker.internet.email()

  const defaultProps = {
    email: faker.internet.email(),
    username: `${faker.name.firstName()} ${faker.name.lastName()}`,
    provider: 'google',
    token: 'fake',
    jwtToken: 'fake_jwt_token'
  };
  return {...defaultProps, ...props};
};

export default async (props = {}) => models.User.create(await data(props));