import database from '../src/models'
import Util from '../utils/utils'
import params from 'params'
import moment from 'moment'

import { Op, literal } from 'sequelize'

const { Category, ActualRow, BudgetRow } = database

const util = new Util()

class CategoryController {
  static async all(req, res) {
    let { year, month } = req.query
    year = year || new Date().getFullYear()
    month = month || (new Date().getMonth() + 1)

    const startDate = moment(`${month}-${year}`, 'MM-YYYY').startOf('month').toDate()
    const endDate = moment(`${month}-${year}`, 'MM-YYYY').endOf('month').toDate()

    try {
      const collection = await Category.findAll({ 
        where: { 
          userId: req.user.id,
          [Op.or]: [
            { archivedAt: { [Op.gte]: startDate } },
            { archivedAt: null },
          ],
        },
        include: [
          { 
            model: ActualRow, 
            as: 'actualRows',
            where: {
              date: {
                [Op.between]: [startDate, endDate]
              }
            },
            required: false,
          },
          { 
            model: BudgetRow, 
            as: 'budgetRow',
            where: {
              id: {
                [Op.in]: literal(`(
                  select DISTINCT ON ("BudgetRows"."categoryId") id
                  from "BudgetRows"
                  where "BudgetRows"."categoryId" = "budgetRow"."categoryId"
                  and to_date("BudgetRows".month || '-' || "BudgetRows".year, 'MM-YYYY') <= to_date('${month}-${year}', 'MM-YYYY')
                  order by "BudgetRows"."categoryId", to_date("BudgetRows".month || '-' || "BudgetRows".year, 'MM-YYYY') desc                  
                )`)
              }
            },
            required: false,
          },
        ],
      })
      if (collection.length > 0) {
        util.setSuccess(200, 'Resource retrieved', collection)
      } else {
        util.setSuccess(200, 'No resource found')
      }
      return util.send(res)
    } catch (error) {
      util.setError(400, error)
      return util.send(res)
    }
  }

  static async create(req, res) {
    const attributes = params(req.body).only(['name', 'parentId', 'kind'])
    attributes.userId = req.user.id
    try {
      const resource = await Category.create(attributes)
      util.setSuccess(201, 'Added!', resource)
      return util.send(res)
    } catch (error) {
      util.setError(400, error.message)
      return util.send(res)
    }
  }

  static async update(req, res) {
    const attributes = params(req.body).only(['name', 'archivedAt'])
    const { id } = req.params
    if (!Number(id)) {
      util.setError(400, 'Please input a valid numeric value')
      return util.send(res)
    }
    try {
      const resource = await Category.findOne({ where: { id: Number(id), userId: req.user.id } })
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

export default CategoryController;