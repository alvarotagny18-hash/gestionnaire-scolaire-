

import { useState } from 'react'
import { useApp } from '../context/AppContext'

function Calendrier() {
  const { evenements, ajouterEvenement, supprimerEvenement } = useApp()
  const [titre, setTitre] = useState('')
  const [date, setDate] = useState('')
  const [type, setType] = useState('devoir')

  const handleAjouter = () => {
    if (titre.trim() === '' || date === '') return
    ajouterEvenement({ titre, date, type })
    setTitre('')
    setDate('')
    setType('devoir')
  }

  const couleurType = (t) => {
    if (t === 'examen') return '#ef4444'
    if (t === 'devoir') return '#f59e0b'
    return '#a78bfa'
  }

  const emojiType = (t) => {
    if (t === 'examen') return '📝'
    if (t === 'devoir') return '📚'
    return '📌'
  }

  const tries = [...evenements].sort((a, b) =>
    new Date(a.date) - new Date(b.date)
  )

  const estProche = (date) => {
    const diff = new Date(date) - new Date()
    return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000
  }

  return (
    <div className="page">
      <h1>📅 Calendrier</h1>

      <div className="formulaire">
        <input
          type="text"
          placeholder="Titre (ex: Examen Maths)"
          value={titre}
          onChange={e => setTitre(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="devoir">📚 Devoir</option>
          <option value="examen">📝 Examen</option>
          <option value="autre">📌 Autre</option>
        </select>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <button onClick={handleAjouter}>+ Ajouter</button>
      </div>

      <div className="liste">
        {tries.length === 0 && (
          <p className="vide">Aucun événement ajouté</p>
        )}
        {tries.map(e => (
          <div className="evenement-card" key={e.id}
            style={{ borderLeft: `5px solid ${couleurType(e.type)}` }}>
            <div className="evenement-info">
              <span>{emojiType(e.type)} {e.titre}</span>
              <small>📅 {e.date}</small>
            </div>
            {estProche(e.date) && (
              <span className="alerte">⚠️ Bientôt !</span>
            )}
            <button className="supprimer"
              onClick={() => supprimerEvenement(e.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendrier