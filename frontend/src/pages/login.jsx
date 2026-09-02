import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [mode, setMode] = useState('login')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm border border-line bg-white p-8">
        <div className="w-14 h-14 rounded-full bg-olive-light mx-auto mb-6" />
        <h1 className="font-display text-2xl text-center mb-6">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>

        <form onSubmit={(e) => { e.preventDefault(); navigate('/account') }} className="space-y-3">
          {mode === 'register' && (
            <input required placeholder="Full name" className="input-field" />
          )}
          <input required placeholder="Email / Phone" className="input-field" />
          <input required type="password" placeholder="Password" className="input-field" />
          {mode === 'register' && (
            <input required type="password" placeholder="Confirm password" className="input-field" />
          )}
          {mode === 'login' && (
            <div className="text-right">
              <button type="button" className="text-xs text-olive-dark hover:underline">Forgot password?</button>
            </div>
          )}
          <button className="btn-primary w-full">{mode === 'login' ? 'Login' : 'Create account'}</button>
        </form>

        <div className="flex items-center gap-3 my-5 text-xs text-stone">
          <span className="flex-1 h-px bg-line" />or<span className="flex-1 h-px bg-line" />
        </div>

        <div className="space-y-2">
          <button className="btn-outline w-full text-sm">Continue with Google</button>
          <button className="btn-outline w-full text-sm">Continue with Facebook</button>
        </div>

        <p className="text-center text-sm text-stone mt-6">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-olive-dark hover:underline">
            {mode === 'login' ? 'Sign up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}