export const getJson = async (url: string) => {
  return fetch(url).then((response) => response.json()).then((body) => body.data)
}