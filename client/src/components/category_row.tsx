import React, { FC, useState, Fragment, ChangeEvent } from "react"
import cn from 'classnames'
import moment from 'moment'
import { sum, sumBy } from 'lodash'

import { ICategory } from "../utils/interfaces";
import { centsToCurrency, centsToFloat, floatToCents } from '../utils/formatters'
import * as API  from "../utils/api";
import { useDispatch, useGlobalState } from "../utils/state";

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
  const [savingCategory, setSavingCategory] = useState(false)

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
    setSavingCategory(true)
    setEditCategory(false)
    API.updateCategory(category.id, { name: categoryName })
      .then((updatedCategory) => { 
        dispatch({ type: 'categories-updated', category: updatedCategory }) 
        setCategoryName(updatedCategory.name)
      })
      .catch(() => setCategoryName(category.name))
      .finally(() => setSavingCategory(false))
  }

  const removeCategory = () => {
    if (window.confirm("Are you sure?")) {
      setSavingCategory(true)
      const archiveFrom = moment(`${month}-${year}`, 'MM-YYYY').startOf('month').format()
      API.archiveCategory(category.id, archiveFrom)
        .then((updatedCategory) => { 
          dispatch({ type: 'categories-updated', category: updatedCategory }) 
        })
        .finally(() => setSavingCategory(false))
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
    return (category.budgetRow && category.budgetRow.id) ? updateBudget() : createBudget()
  }

  return (
    <tr className={isRoot ? 'table-root-row' : 'table-child-row'}>
      <th className="edit-cell">
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
            <i className="fa fa-pen text-sm edit-icon" onClick={() => setEditCategory(true)} role="button" title="Edit"></i>
            &nbsp;
            { !haveChildren && (
              <i className="fa fa-times text-sm edit-icon" onClick={() => !savingCategory && removeCategory()} role="button" title="Remove"></i>
            )}
          </Fragment>
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
          <Fragment>
            { centsToCurrency(budget) }
            <i className="fa fa-pen text-sm edit-icon" onClick={() => !savingBudget && setEditBudget(true)} role="button" title="Edit"></i>
          </Fragment>
        ) }
      </td>
      <td className="edit-cell">
        { centsToCurrency(actual) }
        <i className="fa fa-plus text-sm edit-icon" title="Add" role="button"></i>
      </td>
      <td>{ centsToCurrency(budget - actual) }</td>
    </tr>
  )
}

export default CategoryRow