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
              onClick={() => supprimerMatiere(m.id)}> 
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Matieres