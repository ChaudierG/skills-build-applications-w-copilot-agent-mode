export default function App() {
  return (
    <main className="container py-5">
      <header className="mb-5">
        <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
        <h1 className="display-4 fw-bold">Move together. Go further.</h1>
        <p className="lead text-body-secondary">
          Your home for activities, teams, and friendly competition.
        </p>
      </header>
      <section className="card border-0 shadow-sm" aria-labelledby="setup-heading">
        <div className="card-body p-4">
          <h2 className="h5" id="setup-heading">Your tracker is ready to set up</h2>
          <p className="mb-0 text-body-secondary">
            The presentation, API, and data tiers are ready for the next step.
          </p>
        </div>
      </section>
    </main>
  )
}
