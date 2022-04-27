import React from 'react';
import './Signup.css';

export default function Signup() {
  return (
    <div>
      <header>
        <h1>Signup Below!</h1>
      </header>
      <form className="signup-form">
        <label className="signup-form-input">
          First Name:
          <input type="text" name="firstName" />
        </label>
        <label className="signup-form-input">
          Last Name:
          <input type="text" name="lastName" />
        </label>
        <label className="signup-form-input">
          Email: <input type="text" name="email" />
        </label>
        <label className="signup-form-input">
          Password:
          <input type="text" name="password" />
        </label>
        <label className="signup-form-input">
          Retype Password:
          <input type="text" name="passwordCheck" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
