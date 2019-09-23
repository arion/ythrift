import { mapKeys, isEmpty } from 'lodash'
import moment from 'moment'
import database from '../models';

const { ActualRow, Category } = database;

const noop = (params, row) => row[params.columnName]
const rusToKind = (params, row) => (isEmpty(row[params.columnName]) ? null : (row[params.columnName] === 'Расход' ? 'expense' : 'income'))
const floatToCents = (params, row) => (isEmpty(row[params.columnName]) ? null : Math.round(parseFloat(row[params.columnName]) * 100))
const rusStringToDate = (params, row) => (isEmpty(row[params.columnName]) ? null : moment(row[params.columnName], 'DD/MM/YYYY').toDate())

function parseRow(row, userId, rowMapping) {
  const result = {}
  mapKeys(rowMapping, (value, key) => {
    const parsedCol = eval(value.process)(value, row)
    if (parsedCol) { result[key] = parsedCol }
  })
  if (isEmpty(result)) { return }
  result.userId = userId
  return result
}

export const processCSVRow = async (row, userId, rowMapping) => {
  try {
    const parsedRow = parseRow(row, userId, rowMapping)
    if (!parsedRow) { return }

    // step 1: find category by name and kind or create category with parent
    let parentCategory = null
    const parentName = isEmpty(parsedRow.subCategoryName) ? null : parsedRow.mainCategoryName
    const kind = parsedRow.categoryKind
    const name = parsedRow.subCategoryName || parsedRow.mainCategoryName

    if (parentName) {
      parentCategory = await Category.findOrCreate({ where: { userId, name: parentName, kind } })
    }

    const attributes = { userId, name, kind }

    if (parentCategory && parentCategory[0]) {
      attributes.parentId = parentCategory[0].id
    }

    const category = await Category.findOrCreate({ where: attributes })

    if (!category) { 
      throw "Can't find or create category!" 
    }

    // step 2: find or create actual row

    const actualRow = await ActualRow.findOrCreate({ 
      where: {
        categoryId: category[0].id,
        actualCents: parsedRow.actualCents,
        date: parsedRow.date
      },
      defaults: {
        description: parsedRow.description
      }
    })

    // console.log('actual row created', actualRow[0].id, parsedRow)
  } catch (error) {
    console.error(row, error)
    return null
  }
}