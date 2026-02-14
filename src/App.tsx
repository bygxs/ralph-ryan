import { LoginForm } from './components/LoginForm'
import './App.css'

function App() {
  const handleLogin = (email: string, password: string) => {
    alert(`Login attempted with email: ${email} and password: ${password}`)
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        width: '100%',
        maxWidth: '400px',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Login</h1>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  )
}

export default App