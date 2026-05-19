import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        📚 GestionScolaire
      </div>
      <ul className="navbar-links">
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/matieres">📖 Matières</Link></li>
        <li><Link to="/taches">✅ Tâches</Link></li>
        <li><Link to="/calendrier">📅 Calendrier</Link></li>
        <li><Link to="/revisions">📝 Révisions</Link></li>
      </ul>

      <div className="burger" id="burger" onclick="toggleMobileMenu()">
        <span></span><span></span><span></span>
      </div>
    </nav>

    
  )
}

export default Navbar