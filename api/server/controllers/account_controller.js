import database from '../src/models'
import Util from '../utils/utils'
import params from 'params'

const { User } = database

const util = new Util()

class AccountController {
  static async get(req, res) {
    try {
      const resource = await User.findOne({ where: { id: Number(req.user.id) } })

      if (!resource) {
        util.setError(404, `Cannot find user with the id ${id}`)
      } else {
        util.setSuccess(200, 'Found user', resource)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }
}

export default AccountController
