import { useEffect, useState } from 'react'
import { readCollectionResponse } from '../api.js'

export default function useApiCollection(load) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await load(controller.signal)
        const collection = await readCollectionResponse(response)
        setItems(collection)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load data')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCollection()
    return () => controller.abort()
  }, [load])

  return { items, loading, error }
}
