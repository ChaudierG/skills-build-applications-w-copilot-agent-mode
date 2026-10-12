export default function CollectionPage({ title, description, items, loading, error, renderItem }) {
  return (
    <section>
      <header className="mb-4">
        <p className="text-uppercase text-primary fw-semibold small mb-2">OctoFit Tracker</p>
        <h1 className="display-6 fw-bold mb-2">{title}</h1>
        <p className="text-body-secondary mb-0">{description}</p>
      </header>

      {loading && (
        <div className="d-flex align-items-center gap-2 text-body-secondary" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          Loading {title.toLowerCase()}…
        </div>
      )}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="alert alert-light border" role="status">
          No {title.toLowerCase()} to show yet.
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="row g-3">
          {items.map((item, index) => (
            <div className="col-12 col-md-6 col-xl-4" key={item._id ?? item.id ?? index}>
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
