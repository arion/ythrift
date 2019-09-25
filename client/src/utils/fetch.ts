import { notifier } from './notifier'

interface IResponse {
  json: () => Promise<any>,
  ok: boolean
}

const handleData = (response : IResponse) => {
  if (!response.ok) { throw response }

  return response.json().then((json: any) => json.data)
}

const handleError = (error : any) => {
  let errorMessage = 'Sorry, something went wrong.'
  const contentType = error.headers.get("content-type");

  if (contentType && contentType.indexOf("application/json") === -1) {
    notifier.error(errorMessage)
    throw new Error(errorMessage)
  }

  return error.json().then((data : any) => {
    if (data.message) { errorMessage = data.message }
    notifier.error(errorMessage)
    throw new Error(errorMessage)
  })
}

export const get = (path : string) => fetch(path).then(handleData).catch(handleError)

export const destroy = (path : string) => fetch(path, {
  credentials: 'include',
  method: 'DELETE',
  headers: {'Content-Type': 'application/json'}
})
.then((response : IResponse) => {
  if (!response.ok) { throw response }

  return response
})
.catch(handleError)

export const post = (path : string, payload : any) => {
  return fetch(path,
    {
      credentials: 'include',
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    }
  ).then(handleData).catch(handleError)
}

export const postForm = (path : string, form : any) => {
  return fetch(path,
    {
      credentials: 'include',
      method: 'POST',
      body: form
    }
  ).then(handleData).catch(handleError)
}

export const put = (path: string, payload : any) => {
  return fetch(path,
    {
      credentials: 'include',
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    }
  ).then(handleData).catch(handleError)
}
