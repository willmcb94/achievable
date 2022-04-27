import './Landing.css';

import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
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
        <button>Sign In</button>
        <button>
          <Link to="/signup">Sign Up</Link>
        </button>
      </main>
    </div>
  );
}
