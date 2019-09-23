import React, { FC, useState, Fragment, ChangeEvent } from "react"
import { sumBy } from 'lodash'

import { ICategory } from "../utils/interfaces";
import { centsToCurrency, centsToFloat } from '../utils/formatters'

interface IProps {
  category: ICategory;
  isRoot: boolean;
}

const CategoryRow: FC<IProps> = (props) => {
  const { category, isRoot } = props

  const [editCategory, setEditCategory] = useState(false)
  const [editBudget, setEditBudget] = useState(false)

  const budget = sumBy(category.budgetRows, 'budgetCents')
  const actual = sumBy(category.actualRows, 'actualCents')

  const [categoryName, setCategoryName] = useState(category.name)
  const [budgetAmount, setBudgetAmount] = useState(centsToFloat(budget))

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handleBudgetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBudgetAmount(parseFloat(event.target.value))
  }

  const saveCategory = () => {
    setEditCategory(false)
    setCategoryName(category.name)
  }

  const saveBudget = () => {
    setEditBudget(false)
    setBudgetAmount(centsToFloat(budget))
  }

  return (
    <tr className={isRoot ? 'table-root-row' : 'table-child-row'}>
      <th className="edit-cell" onClick={() => setEditCategory(true)}>
        { editCategory && (
          <Fragment>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              value={ categoryName } 
              onBlur={() => saveCategory()} 
              onKeyDown={(e) => e.key === 'Enter' && saveCategory()} 
              onChange={handleCategoryChange}
              autoFocus />
          </Fragment>
        ) }
        { !editCategory && (
          <Fragment>
            { category.name }
            <i className="fa fa-pen text-sm edit-icon"></i>
          </Fragment>
        ) }
      </th>
      <td className="edit-cell" onClick={() => setEditBudget(true)}>
        { editBudget && (
          <Fragment>
            <input 
              type="number" 
              className="form-control form-control-sm" 
              value={ budgetAmount } 
              onBlur={() => saveBudget()} 
              onKeyDown={(e) => e.key === 'Enter' && saveBudget()} 
              onChange={handleBudgetChange}
              autoFocus/>
          </Fragment>
        ) }
        { !editBudget && (
          <Fragment>
            { centsToCurrency(budget) }
            <i className="fa fa-pen text-sm edit-icon"></i>
          </Fragment>
        ) }
      </td>
      <td className="edit-cell">
        { centsToCurrency(actual) }
        <i className="fa fa-plus text-sm edit-icon"></i>
      </td>
      <td>{ centsToCurrency(budget - actual) }</td>
    </tr>
  )
}

export default CategoryRow