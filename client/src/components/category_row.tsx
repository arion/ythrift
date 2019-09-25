import React, { FC, useState, Fragment, ChangeEvent } from "react"
import cn from 'classnames'
import moment from 'moment'
import { sumBy } from 'lodash'

import { ICategory } from "../utils/interfaces";
import { centsToCurrency, centsToFloat, floatToCents } from '../utils/formatters'
import * as API  from "../utils/api";
import { useDispatch, useGlobalState } from "../utils/state";
import AddActualRowModal from "./add_actual_row_modal";

interface IProps {
  category: ICategory;
  isRoot: boolean;
  haveChildren: boolean;
}

const CategoryRow: FC<IProps> = (props) => {
  const dispatch = useDispatch()
  const { month, year } = useGlobalState('common')

  const { category, isRoot, haveChildren } = props

  const [editCategory, setEditCategory] = useState(false)

  const [editBudget, setEditBudget] = useState(false)
  const [savingBudget, setSavingBudget] = useState(false)

  const budget = category.budgetRow ? category.budgetRow.budgetCents : 0
  const actual = sumBy(category.actualRows, 'actualCents')

  const [categoryName, setCategoryName] = useState(category.name)
  const [budgetAmount, setBudgetAmount] = useState(centsToFloat(budget) as (number | undefined))

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handleBudgetChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBudgetAmount(event.target.value ? parseFloat(event.target.value) : undefined)
  }

  const saveCategory = () => {
    setEditCategory(false)
    API.updateCategory(category.id, { name: categoryName })
      .then((updatedCategory) => { 
        dispatch({ type: 'categories-updated', category: updatedCategory }) 
        setCategoryName(updatedCategory.name)
      })
      .catch(() => setCategoryName(category.name))
  }

  const removeCategory = () => {
    if (window.confirm("Are you sure, you want to archive this category?")) {
      const archiveFrom = moment(`${month}-${year}`, 'MM-YYYY').startOf('month').format()
      API.archiveCategory(category.id, archiveFrom)
        .then((updatedCategory) => { 
          dispatch({ type: 'categories-updated', category: updatedCategory }) 
        })
    }
  }

  const updateBudget = () => {
    API.updateBudgetRow(category.budgetRow!.id, { budgetCents: floatToCents(budgetAmount || 0) })
      .then((budgetRow) => { 
        dispatch({ type: 'categories-budget-row-updated', categoryId: category.id, budgetRow }) 
        setBudgetAmount(budgetRow.budgetCents ? centsToFloat(budgetRow.budgetCents) : undefined)
      })
      .catch(() => setBudgetAmount(centsToFloat(category.budgetRow!.budgetCents)))
      .finally(() => setSavingBudget(false))
  }

  const createBudget = () => {
    API.createBudgetRow({ budgetCents: floatToCents(budgetAmount || 0), categoryId: category.id, month, year })
      .then((budgetRow) => { 
        dispatch({ type: 'categories-budget-row-updated', categoryId: category.id, budgetRow }) 
        setBudgetAmount(budgetRow.budgetCents ? centsToFloat(budgetRow.budgetCents) : undefined)
      })
      .catch(() => setBudgetAmount(0))
      .finally(() => setSavingBudget(false))
  }

  const saveBudget = () => {
    setSavingBudget(true)
    setEditBudget(false)
    const budgetRow = category.budgetRow
    return (budgetRow && budgetRow.id && budgetRow.month === month && budgetRow.year === year) ? updateBudget() : createBudget()
  }

  return (
    <tr className={isRoot ? 'table-root-row' : 'table-child-row'}>
      <th className="edit-cell">
        { editCategory && (
          <div className="input-group">
            <input 
              type="text" 
              className="form-control form-control-sm" 
              value={ categoryName } 
              onKeyDown={(e) => e.key === 'Enter' && saveCategory()} 
              onChange={handleCategoryChange}
              autoFocus />
              <div className="input-group-append">
                <button className="btn btn-success btn-sm" onClick={() => saveCategory()} title="Save">
                  <i className="fa fa-check text-sm"></i>
                </button>
                { !haveChildren && (
                  <button className="btn btn-danger btn-sm" onClick={() => removeCategory()} title="Archive">
                    <i className="fa fa-times text-sm"></i>
                  </button>
                )}
              </div>
          </div>
        ) }
        { !editCategory && (
          <div onClick={() => setEditCategory(true)} role="button">
            { category.name }
            <i className="fa fa-pen text-sm edit-icon" title="Edit"></i>
          </div>
        ) }
      </th>
      <td className={cn('edit-cell', { '-saving': savingBudget })}>
        { editBudget && (
          <Fragment>
            <input 
              type="number" 
              className="form-control form-control-sm" 
              value={ budgetAmount || '' } 
              onBlur={() => saveBudget()} 
              onKeyDown={(e) => e.key === 'Enter' && saveBudget()} 
              onChange={handleBudgetChange}
              autoFocus/>
          </Fragment>
        ) }
        { !editBudget && (
          <div onClick={() => !savingBudget && setEditBudget(true)} role="button">
            { centsToCurrency(budget) }
            <i className="fa fa-pen text-sm edit-icon" title="Edit"></i>
          </div>
        ) }
      </td>
      <td className="edit-cell">
        <AddActualRowModal category={category} actual={actual}></AddActualRowModal>
      </td>
      <td className={cn({'text-danger': (budget - actual) < 0 })}>{ centsToCurrency(budget - actual) }</td>
    </tr>
  )
}

export default CategoryRow