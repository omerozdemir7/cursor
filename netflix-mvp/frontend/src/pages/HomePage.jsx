import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import MovieModal from '../ui/MovieModal'
import { useNavigate } from 'react-router-dom'

const API_BASE = 'http://localhost:4000'

export default function HomePage() {
  const navigate = useNavigate()
  const [movies, setMovies] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    axios.get(`${API_BASE}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMovies(res.data)).catch(() => setMovies([]))
  }, [navigate])

  const categories = useMemo(() => {
    const map = {}
    for (const m of movies) {
      if (!map[m.category]) map[m.category] = []
      map[m.category].push(m)
    }
    return map
  }, [movies])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="app dark">
      <header className="header">
        <div className="logo">Netflux</div>
        <button className="btn btn-ghost" onClick={logout}>Logout</button>
      </header>
      <main className="content">
        {Object.keys(categories).map(cat => (
          <section key={cat} className="category">
            <h3 className="category-title">{cat}</h3>
            <div className="row">
              {categories[cat].map(m => (
                <div className="card" key={m.id} onClick={() => setSelected(m)}>
                  <img src={m.poster_url} alt={m.title} />
                  <div className="card-title">{m.title}</div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
      {selected && (
        <MovieModal movie={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

