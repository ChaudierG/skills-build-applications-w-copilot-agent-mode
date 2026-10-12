import { useCallback } from 'react'
import { getApiUrl } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useApiCollection from '../hooks/useApiCollection.js'

function Workouts() {
  const load = useCallback(
    (signal) => fetch(getApiUrl('/api/workouts/'), { signal }),
    [],
  )
  const { items, loading, error } = useApiCollection(load)

  return (
    <CollectionPage
      description="Choose a workout that fits your goals and energy."
      error={error}
      items={items}
      loading={loading}
      renderItem={(workout) => (
        <article className="card h-100 border-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
              <h2 className="h5 mb-0">{workout.title ?? 'OctoFit workout'}</h2>
              {workout.difficulty && (
                <span className="badge text-bg-light text-capitalize">{workout.difficulty}</span>
              )}
            </div>
            <p className="text-body-secondary">{workout.description ?? 'A workout for your next session.'}</p>
            <p className="mb-0">
              {workout.durationMinutes ?? '—'} min
              {workout.focus ? ` · ${workout.focus}` : ''}
            </p>
          </div>
        </article>
      )}
      title="Workouts"
    />
  )
}

export default Workouts
