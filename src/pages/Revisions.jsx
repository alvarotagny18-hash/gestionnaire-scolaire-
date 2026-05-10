import { useState } from 'react'
import { useApp } from '../context/AppContext'

function Revisions() {
  const { matieres } = useApp()
  const [chapitres, setChapitres] = useState({})
  const [nouveauChapitre, setNouveauChapitre] = useState('')
  const [matiereSelectionnee, setMatiereSelectionnee] = useState(null)

  const ajouterChapitre = (matiereId) => {
    if (nouveauChapitre.trim() === '') return
    const liste = chapitres[matiereId] || []
    setChapitres({
      ...chapitres,
      [matiereId]: [...liste, { id: Date.now(), nom: nouveauChapitre, fait: false }]
    })
    setNouveauChapitre('')
  }

  const toggleChapitre = (matiereId, chapitreId) => {
    setChapitres({
      ...chapitres,
      [matiereId]: chapitres[matiereId].map(c =>
        c.id === chapitreId ? { ...c, fait: !c.fait } : c
      )
    })
  }

  const progression = (matiereId) => {
    const liste = chapitres[matiereId] || []
    if (liste.length === 0) return 0
    return Math.round(
      (liste.filter(c => c.fait).length / liste.length) * 100
    )
  }

  return (
    <div className="page">
      <h1>📝 Révisions</h1>

      {matieres.length === 0 && (
        <p className="vide">
          Aucune matière trouvée —
          <a href="/matieres" style={{ color: '#a78bfa', marginLeft: '5px' }}>
            Ajoute des matières d'abord
          </a>
        </p>
      )}

      <div className="liste">
        {matieres.map(m => (
          <div className="revision-card" key={m.id}
            style={{ borderLeft: `5px solid ${m.couleur}` }}>
            <div className="revision-header"
              onClick={() => setMatiereSelectionnee(
                matiereSelectionnee === m.id ? null : m.id
              )}>
              <span>📖 {m.nom}</span>
              <div className="progression-info">
                <div className="progress-bar">
                  <div className="progress-fill"
                    style={{ width: `${progression(m.id)}%` }}>
                  </div>
                </div>
                <small>{progression(m.id)}%</small>
              </div>
            </div>

            {matiereSelectionnee === m.id && (
              <div className="chapitres">
                <div className="formulaire">
                  <input
                    type="text"
                    placeholder="Nom du chapitre"
                    value={nouveauChapitre}
                    onChange={e => setNouveauChapitre(e.target.value)}
                  />
                  <button onClick={() => ajouterChapitre(m.id)}>
                    + Chapitre
                  </button>
                </div>
                {(chapitres[m.id] || []).length === 0 && (
                  <p className="vide">Aucun chapitre ajouté</p>
                )}
                {(chapitres[m.id] || []).map(c => (
                  <div className="chapitre-item" key={c.id}>
                    <input
                      type="checkbox"
                      checked={c.fait}
                      onChange={() => toggleChapitre(m.id, c.id)}
                    />
                    <span style={{
                      textDecoration: c.fait ? 'line-through' : 'none',
                      color: c.fait ? '#9ca3af' : 'white'
                    }}>
                      {c.nom}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Revisions