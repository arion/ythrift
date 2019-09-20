import { get } from './fetch'

export async function loadCurrentUser() {
  const path = '/api/v1/account'
  return get(path)
}