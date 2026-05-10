import { useState } from 'react'
import { useApp } from '../context/AppContext'

function Taches() {
  const { taches, ajouterTache, supprimerTache, toggleTache } = useApp()
  const [titre, setTitre] = useState('')
  const [matiere, setMatiere] = useState('')
  const [priorite, setPriorite] = useState('normale')
  const [echeance, setEcheance] = useState('')

  const handleAjouter = () => {
    if (titre.trim() === '') return
    ajouterTache({ titre, matiere, priorite, echeance })
    setTitre('')
    setMatiere('')
    setPriorite('normale')
    setEcheance('')
  }

  const couleurPriorite = (p) => {
    if (p === 'haute') return '#ef4444'
    if (p === 'normale') return '#f59e0b'
    return '#22c55e'
  }

  return (
    <div className="page">
      <h1>✅ Mes Tâches</h1>

      <div className="formulaire">
        <input
          type="text"
          placeholder="Titre de la tâche"
          value={titre}
          onChange={e => setTitre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Matière (ex: Maths)"
          value={matiere}
          onChange={e => setMatiere(e.target.value)}
        />
        <select value={priorite} onChange={e => setPriorite(e.target.value)}>
          <option value="haute">🔴 Haute</option>
          <option value="normale">🟡 Normale</option>
          <option value="basse">🟢 Basse</option>
        </select>
        <input
          type="date"
          value={echeance}
          onChange={e => setEcheance(e.target.value)}
        />
        <button onClick={handleAjouter}>+ Ajouter</button>
      </div>

      <div className="liste">
        {taches.length === 0 && (
          <p className="vide">Aucune tâche ajoutée</p>
        )}
        {taches.map(t => (
          <div className="tache-card" key={t.id}
            style={{ borderLeft: `5px solid ${couleurPriorite(t.priorite)}`,
              opacity: t.faite ? 0.5 : 1 }}>
            <input
              type="checkbox"
              checked={t.faite}
              onChange={() => toggleTache(t.id)}
            />
            <div className="tache-info">
              <span style={{ textDecoration: t.faite ? 'line-through' : 'none' }}>
                {t.titre}
              </span>
              <small>{t.matiere} {t.echeance && `— 📅 ${t.echeance}`}</small>
            </div>
            <button className="supprimer"
              onClick={() => supprimerTache(t.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Taches