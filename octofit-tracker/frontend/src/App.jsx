import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import logo from '../../../docs/octofitapp-small.png'

const navigation = [
  ['Activities', '/activities'],
  ['Leaderboard', '/leaderboard'],
  ['Teams', '/teams'],
  ['Users', '/users'],
  ['Workouts', '/workouts'],
]

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 d-flex flex-column">
        <nav className="navbar navbar-expand-lg bg-white border-bottom shadow-sm">
          <div className="container">
            <NavLink className="navbar-brand d-flex align-items-center gap-2 fw-semibold" to="/activities">
              <img src={logo} width="40" height="40" alt="" />
              OctoFit Tracker
            </NavLink>
            <div className="navbar-nav ms-auto flex-row flex-wrap gap-1">
              {navigation.map(([label, path]) => (
                <NavLink
                  className={({ isActive }) => `nav-link px-3${isActive ? ' active fw-semibold' : ''}`}
                  key={path}
                  to={path}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <main className="container py-5 flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate replace to="/activities" />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate replace to="/activities" />} />
          </Routes>
        </main>

        <footer className="border-top bg-white py-3">
          <div className="container small text-body-secondary">
            OctoFit Tracker · Move together. Go further.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}
