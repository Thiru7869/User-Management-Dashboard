import { FiUsers } from 'react-icons/fi'

function Navbar({ userCount }) {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">
          <FiUsers />
        </span>
        <div>
          <h1 className="navbar-title">User Management</h1>
          <p className="navbar-subtitle">Your team directory</p>
        </div>
      </div>
      <div className="navbar-meta">
        <span className="navbar-count">{userCount}</span>
        <span className="navbar-count-label">{userCount === 1 ? 'user' : 'users'}</span>
      </div>
    </header>
  )
}

export default Navbar
