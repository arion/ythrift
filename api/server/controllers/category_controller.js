import database from '../src/models';
import Util from '../utils/utils';
import params from 'params';

const { Category } = database;

const util = new Util();

class CategoryController {
  static async all(req, res) {
    try {
      const collection = await Category.findAll({ where: { userId: req.user.id } });
      if (collection.length > 0) {
        util.setSuccess(200, 'Resource retrieved', collection);
      } else {
        util.setSuccess(200, 'No resource found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async create(req, res) {
    const attributes = params(req.body).only(['name', 'parentId', 'kind']);
    attributes.userId = req.user.id
    try {
      const resource = await Category.create(attributes);
      util.setSuccess(201, 'Added!', resource);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async update(req, res) {
    const attributes = params(req.body).only(['name', 'archivedAt', 'kind', 'parentId']);
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const resource = await Category.findOne({ where: { id: Number(id), userId: req.user.id } });
      if (!resource) {
        util.setError(404, `Cannot find resource with the id: ${id}`);
      } else {
        await resource.update(attributes);
        util.setSuccess(200, 'Resource updated', resource);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
};

export default CategoryController;