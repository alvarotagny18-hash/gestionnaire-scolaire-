import { createContext, useContext, useState } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [matieres, setMatieres] = useState([])
  const [taches, setTaches] = useState([])
  const [evenements, setEvenements] = useState([])

  const ajouterMatiere = (matiere) => {
    setMatieres([...matieres, { id: Date.now(), ...matiere }])
  }

  const supprimerMatiere = (id) => {
    setMatieres(matieres.filter(m => m.id !== id))
  }

  const ajouterTache = (tache) => {
    setTaches([...taches, { id: Date.now(), faite: false, ...tache }])
  }

  const supprimerTache = (id) => {
    setTaches(taches.filter(t => t.id !== id))
  }

  const toggleTache = (id) => {
    setTaches(taches.map(t =>
      t.id === id ? { ...t, faite: !t.faite } : t
    ))
  }

  const ajouterEvenement = (evenement) => {
    setEvenements([...evenements, { id: Date.now(), ...evenement }])
  }

  const supprimerEvenement = (id) => {
    setEvenements(evenements.filter(e => e.id !== id))
  }

  return (
    <AppContext.Provider value={{
      matieres, ajouterMatiere, supprimerMatiere,
      taches, ajouterTache, supprimerTache, toggleTache,
      evenements, ajouterEvenement, supprimerEvenement
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}