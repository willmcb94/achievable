import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export default function Goals() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <h1>Goals</h1>
      <p>Hey {user}</p>
    </div>
  );
}
