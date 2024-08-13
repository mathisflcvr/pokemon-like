// src/contexts/TeamContext.js

import React, { createContext, useState } from 'react';

// Crée le contexte
export const TeamContext = createContext();

// Crée le fournisseur de contexte
export function TeamProvider({ children }) {
  const [team, setTeam] = useState([]); // Définition de l'état de l'équipe

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamContext.Provider>
  );
}
