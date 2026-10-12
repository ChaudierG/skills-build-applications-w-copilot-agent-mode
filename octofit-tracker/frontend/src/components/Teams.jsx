import { useCallback } from 'react'
import { getApiUrl } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useApiCollection from '../hooks/useApiCollection.js'

function Teams() {
  const load = useCallback(
    (signal) => fetch(getApiUrl('/api/teams/'), { signal }),
    [],
  )
  const { items, loading, error } = useApiCollection(load)

  return (
    <CollectionPage
      description="Find your crew and keep each other moving."
      error={error}
      items={items}
      loading={loading}
      renderItem={(team) => (
        <article className="card h-100 border-0 shadow-sm">
          <div className="card-body">
            <h2 className="h5">{team.name ?? 'OctoFit team'}</h2>
            <p className="text-body-secondary">{team.description ?? 'A team ready to move together.'}</p>
            <p className="mb-1">
              <strong>{team.members?.length ?? 0}</strong> members
            </p>
            {team.captain?.name && (
              <p className="small text-body-secondary mb-0">Captain: {team.captain.name}</p>
            )}
          </div>
        </article>
      )}
      title="Teams"
    />
  )
}

export default Teams
