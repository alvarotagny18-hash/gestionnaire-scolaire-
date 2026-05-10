import { useState } from 'react'
import { useApp } from '../context/AppContext'

function Matieres() {
  const { matieres, ajouterMatiere, supprimerMatiere } = useApp()
  const [nom, setNom] = useState('')
  const [couleur, setCouleur] = useState('#a78bfa')

  const handleAjouter = () => {
    if (nom.trim() === '') return
    ajouterMatiere({ nom, couleur })
    setNom('')
  }

  return (
    <div className="page">
      <h1>📖 Mes Matières</h1>

      <div className="formulaire">
        <input
          type="text"
          placeholder="Nom de la matière (ex: Maths)"
          value={nom}
          onChange={e => setNom(e.target.value)}
        />
        <input
          type="color"
          value={couleur}
          onChange={e => setCouleur(e.target.value)}
        />
        <button onClick={handleAjouter}>+ Ajouter</button>
      </div>

      <div className="liste">
        {matieres.length === 0 && (
          <p className="vide">Aucune matière ajoutée</p>
        )}
        {matieres.map(m => (
          <div className="matiere-card" key={m.id}
            style={{ borderLeft: `5px solid ${m.couleur}` }}>
            <span>{m.nom}</span>
            <button className="supprimer"
              onClick={() => supprimerMatiere(m.id)}>🗑️</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Matieres