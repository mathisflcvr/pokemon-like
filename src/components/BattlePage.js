// src/components/BattlePage.js

import React, { useContext } from 'react';
import { TeamContext } from '../contexts/TeamContext';

function BattlePage() {
  const { team } = useContext(TeamContext);

  // Fonction pour démarrer un combat simple
  const startBattle = () => {
    if (team.length < 2) {
      alert('Vous devez avoir au moins 2 Pokémon dans l\'équipe pour commencer le combat.');
      return;
    }

    // Choix aléatoire d'un Pokémon gagnant pour la démo
    const winner = team[Math.floor(Math.random() * team.length)];
    alert(`Le gagnant est: ${winner.name}`);
  };

  return (
    <div>
      <h1>Battle Page</h1>
      <div>
        {team.length === 0 ? (
          <p>Vous n'avez pas encore de Pokémon dans votre équipe.</p>
        ) : (
          <div>
            <h2>Your Team</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {team.map((pokemon) => (
                <div key={pokemon.id} className="pokemon-card">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    alt={pokemon.name}
                    className="pokemon-image"
                  />
                  <h2 className="pokemon-name">{pokemon.name}</h2>
                </div>
              ))}
            </div>
            <button className="start-battle-btn" onClick={startBattle}>
              Start Battle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BattlePage;