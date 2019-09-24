import database from '../src/models'
import Util from '../utils/utils'
import params from 'params'

const { BudgetRow, Category } = database

const util = new Util()

class BudgetRowController {
  static async create(req, res) {
    const attributes = params(req.body).only(['categoryId', 'month', 'year', 'budgetCents'])
    attributes.userId = req.user.id
    try {
      const category = await Category.findOne({ where: { id: Number(attributes.categoryId), userId: req.user.id } })
      if (!category) {
        util.setError(404, `Cannot find category with the id: ${attributes.categoryId}`)
      } else {  
        const resource = await BudgetRow.create(attributes)
        util.setSuccess(201, 'Added!', resource)
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async update(req, res) {
    const attributes = params(req.body).only(['budgetCents'])
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, `Please input a valid numeric value: ${id}`)
      return util.send(res)
    }
    try {
      const resource = await BudgetRow.findOne({ 
        where: { id: Number(id) },
        include: [
          {
            model: Category,
            as: 'category',
            where: {
              userId: req.user.id
            }
          }
        ]
      })
      if (!resource) {
        util.setError(404, `Cannot find resource with the id: ${id}`)
      } else {
        await resource.update(attributes)
        util.setSuccess(200, 'Resource updated', resource)
      }
      return util.send(res)
    } catch (error) {
      util.setError(404, error)
      return util.send(res)
    }
  }
}

export default BudgetRowController;