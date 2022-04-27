import './Landing.css';
import { auth } from '../../firebase.js';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/goals');
    } catch {
      setError('Failed to login, please check your details');
    }
  };
  return (
    <div className="landing-container">
      <header>
        <h1>Welcome to Achievable!</h1>
      </header>
      <main>
        <h2>
          “Whether you think you can, or you think you can’t – you’re right”
          <dt>Henry Ford</dt>
        </h2>
        <form>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>password</label>
          <input
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" value="Submit" onClick={(e) => handleSignIn(e)}>
            Sign in
          </button>
        </form>
        {error ? <p>{error}</p> : null}

        <h3>
          Dont have an account? <Link to="/signup">Sign up here</Link>
        </h3>
      </main>
    </div>
  );
}
