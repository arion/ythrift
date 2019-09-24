import React, { FC, useEffect } from 'react'
import { sum, sumBy, groupBy } from 'lodash'

import MonthSelector from '../components/month_selector'

import { useDispatch, useGlobalState } from '../utils/state'
import { loadCategories } from '../utils/api'
import CategoriesTable from '../components/categories_table';
import { centsToCurrency } from '../utils/formatters';

const DashboardPage: FC = () => {
  const dispatch = useDispatch()
  const { categories } = useGlobalState('category')
  const { month, year } = useGlobalState('common')

  const groupedCategories = groupBy(categories, 'kind')
  const incomes = groupedCategories['income'] || []
  const expenses = groupedCategories['expense'] || []

  useEffect(() => {
    if (!month || !year) { return }
    dispatch({ type: 'categories-loading' })
    loadCategories(month, year)
      .then((categories) => dispatch({ type: 'categories-loaded', categories }))
      .catch(() => dispatch({ type: 'categories-loaded', categories: [] }))
  },[month, year, dispatch])

  const incomeActual = sum(incomes.map((c) => sumBy(c.actualRows, 'actualCents')))
  const expensesActual = sum(expenses.map((c) => sumBy(c.actualRows, 'actualCents')))
  
  const incomeBudget = sum(incomes.map((c) => (c.budgetRow ? c.budgetRow.budgetCents : 0)))
  const expensesBudget = sum(expenses.map((c) => (c.budgetRow ? c.budgetRow.budgetCents : 0)))

  const totals = {
    incomes: {
      actual: incomeActual,
      budget: incomeBudget,
    },
    expenses: {
      actual: expensesActual,
      budget: expensesBudget,
    },
    current: {
      actual: expensesActual - incomeActual,
      budget: expensesBudget - expensesActual,
    },
  }

  return (
    <div>
      <div className="datepicker-header container-fluid">
        <MonthSelector />
      </div>
      <section className="dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">Income</div>
                <div className="card-body">
                  <div className="table-responsive">
                    <CategoriesTable categories={incomes} kind="income" />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">Expenses</div>
                <div className="card-body">
                  <div className="table-responsive">
                    <CategoriesTable categories={expenses} kind="expense" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <p className="lead">Current Balance</p>
                  <div className="text-center display-4">{centsToCurrency(totals.current.actual)}</div>
                  <hr/>
                  <p className="lead">Income</p>
                  <div className="row">
                    <div className="col">
                      <div>Budgeted</div>
                      <div>{centsToCurrency(totals.incomes.budget)}</div>
                    </div>
                    <div className="col">
                      <div>Actual</div>
                      <div>{centsToCurrency(totals.incomes.actual)}</div>
                    </div>
                  </div>
                  <hr/>
                  <p className="lead">Expenses</p>
                  <div className="row">
                    <div className="col">
                      <div>Budgeted</div>
                      <div>{centsToCurrency(totals.expenses.budget)}</div>
                    </div>
                    <div className="col">
                      <div>Actual</div>
                      <div>{centsToCurrency(totals.expenses.actual)}</div>
                    </div>
                  </div>
                  <hr/>
                  <p className="lead">End of month</p>
                  <div className="text-center display-4">{centsToCurrency(totals.current.budget)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DashboardPage