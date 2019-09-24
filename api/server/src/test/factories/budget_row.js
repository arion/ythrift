import models from '../../models';

import userFactory from '../factories/user';
import categoryFactory from '../factories/category';

const data = async (props = {}) => {
  const userId = props.userId || (await userFactory()).id
  const categoryId = props.categoryId || (await categoryFactory({ userId })).id

  const defaultProps = {
    categoryId: categoryId
  };
  return {...defaultProps, ...props};
};

export default async (props = {}) => models.BudgetRow.create(await data(props));