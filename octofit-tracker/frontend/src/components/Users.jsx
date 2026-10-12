import { useCallback } from 'react'
import { getApiUrl } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useApiCollection from '../hooks/useApiCollection.js'

function Users() {
  const load = useCallback(
    (signal) => fetch(getApiUrl('/api/users/'), { signal }),
    [],
  )
  const { items, loading, error } = useApiCollection(load)

  return (
    <CollectionPage
      description="Meet the people building healthy habits with OctoFit."
      error={error}
      items={items}
      loading={loading}
      renderItem={(user) => (
        <article className="card h-100 border-0 shadow-sm">
          <div className="card-body">
            <h2 className="h5">{user.name ?? user.username ?? 'OctoFit member'}</h2>
            {user.fitnessGoal && <p className="text-body-secondary">{user.fitnessGoal}</p>}
            <p className="mb-0">
              <span className="text-body-secondary">Team: </span>
              {user.team?.name ?? 'Looking for a team'}
            </p>
          </div>
        </article>
      )}
      title="Users"
    />
  )
}

export default Users
