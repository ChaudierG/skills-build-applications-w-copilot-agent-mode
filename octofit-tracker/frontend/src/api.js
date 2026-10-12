const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getApiUrl(path) {
  return `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export async function readCollectionResponse(response) {
  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) {
    return payload
  }

  const collection =
    payload?.results ??
    payload?.items ??
    payload?.data?.results ??
    payload?.data?.items ??
    payload?.data

  if (Array.isArray(collection)) {
    return collection
  }

  throw new Error('The API response did not contain a collection')
}
