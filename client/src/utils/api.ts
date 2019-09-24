import { get, put, post } from './fetch'

export function loadCurrentUser() {
  const path = '/api/v1/account'
  return get(path)
}

export function loadCategories(month: number, year: number) {
  const path = `/api/v1/categories?month=${month}&year=${year}`
  return get(path)
}

export function updateCategory(categoryId: number, payload: object) {
  const path = `/api/v1/categories/${categoryId}`
  return put(path, payload)
}

export function archiveCategory(categoryId: number, from: string) {
  const path = `/api/v1/categories/${categoryId}`
  // TODO: remove from selected date
  return put(path, { archivedAt: from })
}

export function createBudgetRow(payload: object) {
  const path = `/api/v1/budget_rows`
  return post(path, payload)
}

export function updateBudgetRow(budgetRowId: number, payload: object) {
  const path = `/api/v1/budget_rows/${budgetRowId}`
  return put(path, payload)
}