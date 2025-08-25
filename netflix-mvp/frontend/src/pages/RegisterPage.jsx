import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = 'http://localhost:4000'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await axios.post(`${API_BASE}/users/register`, { email, password })
      const res = await axios.post(`${API_BASE}/users/login`, { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="logo">Netflux</h1>
        <h2>Create Account</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={onSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
        <p className="alt">Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
  )
}

