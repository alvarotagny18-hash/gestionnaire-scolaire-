import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Matieres from './pages/Matieres'
import Taches from './pages/Taches'
import Calendrier from './pages/Calendrier'
import Revisions from './pages/Revisions'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/matieres" element={<Matieres />} />
          <Route path="/taches" element={<Taches />} />
          <Route path="/calendrier" element={<Calendrier />} />
          <Route path="/revisions" element={<Revisions />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App