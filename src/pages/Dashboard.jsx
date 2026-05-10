import { useApp } from '../context/AppContext'
import { Link } from 'react-router-dom'

function Dashboard() {
  const { taches, matieres, evenements } = useApp()

  const aujourdhui = new Date().toISOString().split('T')[0]

  const tachesAujourdhui = taches.filter(t =>
    t.echeance === aujourdhui && !t.faite
  )

  const tachesUrgentes = taches.filter(t =>
    t.priorite === 'haute' && !t.faite
  )

  const prochainsExamens = evenements.filter(e => {
    const diff = new Date(e.date) - new Date()
    return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000
  })

  const tachesFaites = taches.filter(t => t.faite).length
  const progression = taches.length === 0 ? 0 :
    Math.round((tachesFaites / taches.length) * 100)

  return (
    <div className="dashboard">
      <h1>🏠 Tableau de bord</h1>

      <div className="dashboard-cards">

        <div className="card">
          <h2>✅ Tâches du jour</h2>
          {tachesAujourdhui.length === 0 ? (
            <p>Aucune tâche pour aujourd'hui</p>
          ) : (
            tachesAujourdhui.map(t => (
              <div className="dash-item" key={t.id}>
                <span>• {t.titre}</span>
                <small>{t.matiere}</small>
              </div>
            ))
          )}
          <Link to="/taches" className="voir-plus">Voir toutes →</Link>
        </div>

        <div className="card">
          <h2>🔴 Tâches urgentes</h2>
          {tachesUrgentes.length === 0 ? (
            <p>Aucune tâche urgente</p>
          ) : (
            tachesUrgentes.map(t => (
              <div className="dash-item" key={t.id}>
                <span>• {t.titre}</span>
                <small>{t.matiere}</small>
              </div>
            ))
          )}
          <Link to="/taches" className="voir-plus">Voir toutes →</Link>
        </div>

        <div className="card">
          <h2>📅 Examens cette semaine</h2>
          {prochainsExamens.length === 0 ? (
            <p>Aucun examen cette semaine</p>
          ) : (
            prochainsExamens.map(e => (
              <div className="dash-item" key={e.id}>
                <span>• {e.titre}</span>
                <small>📅 {e.date}</small>
              </div>
            ))
          )}
          <Link to="/calendrier" className="voir-plus">Voir calendrier →</Link>
        </div>

        <div className="card">
          <h2>📊 Progression générale</h2>
          <div className="progression-globale">
            <div className="progress-bar">
              <div className="progress-fill"
                style={{ width: `${progression}%` }}>
              </div>
            </div>
            <span>{progression}% des tâches complétées</span>
          </div>
          <p style={{ marginTop: '10px' }}>
            📖 {matieres.length} matière(s) · ✅ {tachesFaites}/{taches.length} tâches
          </p>
          <Link to="/matieres" className="voir-plus">Gérer les matières →</Link>
        </div>

      </div>
    </div>
  )
}

export default Dashboard