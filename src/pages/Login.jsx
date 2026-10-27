import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiShoppingBag } from 'react-icons/fi';
import { useStore } from '../context/StoreContext.jsx';

export default function Login({ register = false }) {
  const [isRegister, setIsRegister] = useState(register);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { notify } = useStore();
  const submit = (e) => {
    e.preventDefault();
    if (password.length < 6) { setMessage('Password must be at least 6 characters.'); return; }
    if (isRegister && name.trim().length < 2) { setMessage('Please enter your name.'); return; }
    // Frontend demo only: no real account or password is created.
    setMessage('');
    notify(isRegister ? 'Demo registration complete' : 'Demo sign-in complete');
    navigate('/');
  };
  return <main className="container auth-page"><div className="auth-visual"><div className="auth-visual-content"><span className="eyebrow light-eyebrow">A GOOD FIND IS A GOOD FEELING</span><h1>Make room for<br /><span>your kind of style.</span></h1><p>Everyday favourites, thoughtfully brought together.</p><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85" alt="Fashion collection" /></div></div><div className="auth-form-side"><div className="auth-form-wrap"><span className="auth-icon"><FiShoppingBag /></span><span className="eyebrow">{isRegister ? 'JOIN THE COMMUNITY' : 'WELCOME BACK'}</span><h2>{isRegister ? 'Create your account' : 'Good to see you.'}</h2><p>{isRegister ? 'Create a demo profile to continue exploring.' : 'Sign in to pick up where you left off.'}</p><form onSubmit={submit} className="auth-form">{isRegister && <label>Full name<input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your full name" required /></label>}<label>Email address<input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" required /></label><label>Password<div className="password-field"><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="At least 6 characters" minLength="6" required /><button type="button" onClick={()=>setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? <FiEyeOff /> : <FiEye />}</button></div></label>{message && <p className="form-error">{message}</p>}<button className="btn-primary-custom auth-submit" type="submit">{isRegister ? 'Create demo account' : 'Sign in'} →</button></form><p className="auth-switch">{isRegister ? 'Already have an account?' : 'New to StyleKart?'} <button onClick={()=>{setIsRegister(!isRegister);setMessage('');}}>{isRegister ? 'Sign in' : 'Create an account'}</button></p><small className="demo-note">Demo only: this form does not create real accounts or authenticate users.</small><Link to="/" className="back-link">← Back to home</Link></div></div></main>;
}