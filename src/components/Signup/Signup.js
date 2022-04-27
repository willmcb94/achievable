import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../../firebase.js';

import React, { useContext, useState } from 'react';
import './Signup.css';
import { UserContext } from '../../contexts/UserContext.js';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return setError('Incorrect email');
    }
    if (password !== passwordCheck) {
      return setError('Passwords do not match');
    }
    try {
      setError('');
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setUser(name);
      navigate('/goals');
    } catch {
      setError('Failed to create account');
    }
  };
  return (
    <div>
      <header>
        <h1>Signup Below!</h1>
      </header>

      <form className="signup-form">
        <label className="signup-form-input">
          First Name:
          <input
            type="text"
            name="firstName"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="signup-form-input">
          Last Name:
          <input type="text" name="lastName" required />
        </label>
        <label className="signup-form-input">
          Email:{' '}
          <input
            type="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="signup-form-input">
          Password:
          <input
            type="password"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="signup-form-input">
          Retype Password:
          <input
            type="password"
            name="passwordCheck"
            required
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </label>
        {error ? <p>{error}</p> : null}
        <button
          disabled={loading}
          type="submit"
          value="Submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
