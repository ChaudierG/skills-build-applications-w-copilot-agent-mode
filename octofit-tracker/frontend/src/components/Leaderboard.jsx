import { useCallback } from 'react'
import { getApiUrl } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useApiCollection from '../hooks/useApiCollection.js'

function Leaderboard() {
  const load = useCallback(
    (signal) => fetch(getApiUrl('/api/leaderboard/'), { signal }),
    [],
  )
  const { items, loading, error } = useApiCollection(load)

  return (
    <CollectionPage
      description="Celebrate the people and teams earning points this period."
      error={error}
      items={items}
      loading={loading}
      renderItem={(entry) => (
        <article className="card h-100 border-0 shadow-sm">
          <div className="card-body d-flex align-items-center gap-3">
            <span className="display-6 fw-bold text-primary">#{entry.rank ?? '—'}</span>
            <div>
              <h2 className="h5 mb-1">{entry.user?.name ?? entry.team?.name ?? 'OctoFit member'}</h2>
              <p className="text-body-secondary mb-0 text-capitalize">
                {entry.period ?? 'Leaderboard'} · {entry.points ?? 0} points
              </p>
            </div>
          </div>
        </article>
      )}
      title="Leaderboard"
    />
  )
}

export default Leaderboard
