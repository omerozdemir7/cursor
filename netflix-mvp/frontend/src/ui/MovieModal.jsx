import { useNavigate } from 'react-router-dom'

export default function MovieModal({ movie, onClose }) {
  const navigate = useNavigate()
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <button className="close" onClick={onClose}>×</button>
        <div className="modal-body">
          <img src={movie.poster_url} alt={movie.title} className="modal-poster" />
          <div className="modal-info">
            <h2>{movie.title}</h2>
            <p className="muted">{movie.duration_minutes} min</p>
            <p>{movie.description}</p>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={() => navigate(`/player/${movie.id}`)}>▶ Play</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

