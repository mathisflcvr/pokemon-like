// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TeamProvider } from './contexts/TeamContext';
import TeamBuilder from './components/TeamBuilder';
import HomePage from './pages/HomePage';
import BattlePage from './components/BattlePage';

function App() {
  return (
    <TeamProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team-builder" element={<TeamBuilder />} />
          <Route path="/battle" element={<BattlePage />} />
        </Routes>
      </Router>
    </TeamProvider>
  );
}

export default App;
