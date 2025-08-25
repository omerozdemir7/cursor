import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import PlayerPage from './pages/PlayerPage'

function App() {
  const isAuthed = !!localStorage.getItem('token')
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={isAuthed ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/player/:id" element={isAuthed ? <PlayerPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthed ? '/' : '/login'} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
