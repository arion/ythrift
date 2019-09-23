import { get } from './fetch'

export function loadCurrentUser() {
  const path = '/api/v1/account'
  return get(path)
}

export function loadCategories(month: number, year: number) {
  const path = `/api/v1/categories?month=${month}&year=${year}`
  return get(path)
}