import React, { useState } from 'react';
import Signup from './Signup/Signup';
import Landing from './Landing/Landing';
import { Route, Routes } from 'react-router-dom';
import Goals from './Goals/Goals';
import { UserContext } from '../contexts/UserContext';

function App() {
  const [user, setUser] = useState('');
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
