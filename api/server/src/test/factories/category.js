import faker from 'faker';
import models from '../../models';

import userFactory from '../factories/user';

const data = async (props = {}) => {
  const userId = props.userId || (await userFactory()).id

  const defaultProps = {
    name: faker.lorem.word(),
    kind: 'expense',
    userId: userId
  };
  return {...defaultProps, ...props};
};

export default async (props = {}) => models.Category.create(await data(props));