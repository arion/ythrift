import models from '../models';

export default async function truncate() {
  return await Promise.all(
    Object.keys(models).map((key) => {
      if (['sequelize', 'Sequelize'].includes(key)) return null;
      return models[key].destroy({ where: {}, force: true });
    })
  );
}