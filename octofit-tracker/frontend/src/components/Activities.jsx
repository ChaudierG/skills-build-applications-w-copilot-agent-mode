import { useCallback } from 'react'
import { getApiUrl } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useApiCollection from '../hooks/useApiCollection.js'

function Activities() {
  const load = useCallback(
    (signal) => fetch(getApiUrl('/api/activities/'), { signal }),
    [],
  )
  const { items, loading, error } = useApiCollection(load)

  return (
    <CollectionPage
      description="See the latest movement logged by your community."
      error={error}
      items={items}
      loading={loading}
      renderItem={(activity) => (
        <article className="card h-100 border-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
              <h2 className="h5 text-capitalize mb-0">{activity.type ?? 'Activity'}</h2>
              <span className="badge text-bg-primary">{activity.durationMinutes ?? '—'} min</span>
            </div>
            <p className="mb-2">
              <strong>{activity.user?.name ?? 'OctoFit member'}</strong>
              {activity.team?.name ? ` · ${activity.team.name}` : ''}
            </p>
            <p className="text-body-secondary mb-2">
              {activity.distanceKm != null ? `${activity.distanceKm} km` : 'Distance not recorded'}
              {activity.calories != null ? ` · ${activity.calories} kcal` : ''}
            </p>
            <time className="small text-body-secondary" dateTime={activity.completedAt}>
              {activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Date unavailable'}
            </time>
          </div>
        </article>
      )}
      title="Activities"
    />
  )
}

export default Activities
