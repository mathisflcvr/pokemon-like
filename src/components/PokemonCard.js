import React from 'react';
import './PokemonCard.css'; // Assurez-vous de créer ce fichier CSS

function PokemonCard({ pokemon, addToTeam, removeFromTeam, isInTeam, disableAdd }) {
  return (
    <div className="pokemon-card">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <h2 className="pokemon-name">{pokemon.name}</h2>
      {isInTeam ? (
        <button className="remove-from-team-btn" onClick={() => removeFromTeam(pokemon)}>
          Remove from Team
        </button>
      ) : (
        <button
          className="add-to-team-btn"
          onClick={() => addToTeam(pokemon)}
          disabled={disableAdd} // Désactiver le bouton si l'équipe est pleine
        >
          Add to Team
        </button>
      )}
    </div>
  );
}

export default PokemonCard;
