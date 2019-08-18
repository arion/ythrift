import database from '../src/models';
import Util from '../utils/utils';
import params from 'params';

const { User } = database;

const util = new Util();

class UserController {
  static async all(req, res) {
    try {
      const collection = await User.findAll();
      if (collection.length > 0) {
        util.setSuccess(200, 'Users retrieved', collection);
      } else {
        util.setSuccess(200, 'No user found');
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async create(req, res) {
    const attributes = params(req.body).only(['username', 'email', 'provider', 'token']);
    try {
      const resource = await User.create(attributes);
      util.setSuccess(201, 'Added!', resource);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async update(req, res) {
    const attributes = params(req.body).only(['username']);
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }
    try {
      const resource = await User.findOne({ where: { id: Number(id) } });
      if (!resource) {
        util.setError(404, `Cannot find user with the id: ${id}`);
      } else {
        await resource.update(attributes);
        util.setSuccess(200, 'User updated', resource);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async find(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value');
      return util.send(res);
    }

    try {
      const resource = await User.findOne({ where: { id: Number(id) } });

      if (!resource) {
        util.setError(404, `Cannot find user with the id ${id}`);
      } else {
        util.setSuccess(200, 'Found user', resource);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, 'Please provide a numeric value');
      return util.send(res);
    }

    try {
      const resource = await User.findOne({ where: { id: Number(id) } });

      if (resource && resource.destroy()) {
        util.setSuccess(200, 'User deleted');
      } else {
        util.setError(404, `User with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
};

export default UserController;