import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'http://localhost:4000'

export default function PlayerPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    axios.get(`${API_BASE}/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setMovie(res.data)).catch(() => setMovie(null))
  }, [id, navigate])

  if (!movie) return <div className="app dark"><header className="header"><div className="logo" onClick={()=>navigate('/')}>Netflux</div></header><main className="content"><p>Loading...</p></main></div>

  return (
    <div className="app dark">
      <header className="header">
        <div className="logo" onClick={()=>navigate('/')}>Netflux</div>
      </header>
      <main className="content player">
        <h2>{movie.title}</h2>
        <video controls width="100%" poster={movie.poster_url}>
          <source src={movie.video_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="muted">{movie.duration_minutes} min • {movie.category}</p>
        <p>{movie.description}</p>
      </main>
    </div>
  )
}

