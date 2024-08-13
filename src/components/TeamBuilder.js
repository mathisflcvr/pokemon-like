// src/components/TeamBuilder.js

import React, { useContext, useState, useEffect } from 'react';
import { TeamContext } from '../contexts/TeamContext';
import PokemonCard from './PokemonCard';
import { fetchPokemons, fetchPokemonDetails, fetchMoveDetails } from '../services/api';
import './TeamBuilder.css';

function TeamBuilder() {
  const { team, setTeam } = useContext(TeamContext);
  const [pokemons, setPokemons] = useState([]);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [battleResult, setBattleResult] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerMove, setPlayerMove] = useState(null);
  const [availableMoves, setAvailableMoves] = useState([]);
  const [enemyMoves, setEnemyMoves] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const pokemonList = await fetchPokemons();
      setPokemons(pokemonList);
    };
    getPokemons();
  }, []);

  const addToTeam = (pokemon) => {
    if (team.length < 3 && !team.find(p => p.id === pokemon.id)) {
      setTeam([...team, pokemon]);
    }
  };

  const removeFromTeam = (pokemon) => {
    setTeam(team.filter(p => p.id !== pokemon.id));
  };

  const handleSelectPlayer = async (event) => {
    const playerId = parseInt(event.target.value);
    if (playerId) {
      const player = await fetchPokemonDetails(playerId);
      setSelectedPlayer(player);
      setAvailableMoves(player.moves);
      setPlayerMove(null); // Reset selected move when player changes
    } else {
      setSelectedPlayer(null);
      setAvailableMoves([]);
    }
  };

  const handlePlayerMoveChange = async (event) => {
    const moveUrl = event.target.value;
    if (moveUrl) {
      const move = await fetchMoveDetails(moveUrl);
      setPlayerMove(move);
    } else {
      setPlayerMove(null);
    }
  };

  const handleSelectEnemy = async (event) => {
    const enemyId = parseInt(event.target.value);
    if (enemyId) {
      const enemy = await fetchPokemonDetails(enemyId);
      setSelectedEnemy(enemy);
      setEnemyMoves(enemy.moves);
    } else {
      setSelectedEnemy(null);
      setEnemyMoves([]);
    }
  };

  const handleRandomEnemy = async () => {
    const availablePokemons = pokemons.filter(p => !team.find(t => t.id === p.id));
    const randomEnemy = availablePokemons[Math.floor(Math.random() * availablePokemons.length)];
    const enemy = await fetchPokemonDetails(randomEnemy.id);
    setSelectedEnemy(enemy);
    setEnemyMoves(enemy.moves);
  };

  const startBattle = () => {
    if (selectedEnemy && selectedPlayer && playerMove) {
      // Randomly select an enemy move for simplicity
      const randomEnemyMove = enemyMoves[Math.floor(Math.random() * enemyMoves.length)];
      fetchMoveDetails(randomEnemyMove.url).then(enemyMove => {
        const result = battle(selectedPlayer, selectedEnemy, playerMove, enemyMove);
        setBattleResult(result);
      });
    } else {
      setBattleResult('Please complete all selections before starting the battle.');
    }
  };

  const battle = (player, enemy, playerMove, enemyMove) => {
    let playerHp = player.hp;
    let enemyHp = enemy.hp;

    const playerDamage = playerMove.power;
    const enemyDamage = enemyMove.power;

    // Battle loop
    while (playerHp > 0 && enemyHp > 0) {
      enemyHp -= playerDamage;
      if (enemyHp <= 0) return `${player.name} wins!`;

      playerHp -= enemyDamage;
      if (playerHp <= 0) return `${enemy.name} wins!`;
    }
  };

  return (
    <div className="teambuilder-container">
      <h1>Créez votre équipe</h1>
      <div className="team-and-battle">
        <section className="team-section">
          <h2>Mon équipe</h2>
          <div className="team-cards">
            {team.length > 0 ? (
              team.map(pokemon => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  removeFromTeam={removeFromTeam}
                  isInTeam={true}
                />
              ))
            ) : (
              <p>Aucun pokemon dans votre équipe pour le moment.</p>
            )}
          </div>
        </section>
        <section className="battle-section">
          <h2>Séléctionnez vos pokemon pour le fight</h2>
          <div className="battle-controls">
            <div>
              <h3>Vos Pokémon</h3>
              <select onChange={handleSelectPlayer} value={selectedPlayer?.id || ''}>
                <option value="">Sélectionnez votre pokémon</option>
                {team.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <select onChange={handlePlayerMoveChange} value={playerMove?.url || ''}>
                <option value="">Sélectionnez un move</option>
                {availableMoves.map((move, index) => (
                  <option key={index} value={move.url}>{move.name}</option>
                ))}
              </select>
            </div>
            <div>
              <h3>Sélectionnez le pokemon ennemi</h3>
              <select onChange={handleSelectEnemy} value={selectedEnemy?.id || ''}>
                <option value="">Sélectionnez l'ennemi</option>
                {pokemons.filter(p => !team.find(t => t.id === p.id)).map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button onClick={handleRandomEnemy}>Choisir un ennemi au hasard</button>
            </div>
            <button onClick={startBattle}>Commencez le fight</button>
          </div>
          {battleResult && <p className="battle-result">{battleResult}</p>}
        </section>
      </div>
      <section className="pokemon-selection">
        <h2>Sélectionnez des pokemon pour les ajouter à votre équipe (3 max)</h2>
        <div className="pokemon-cards">
          {pokemons.map(pokemon => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              addToTeam={addToTeam}
              removeFromTeam={removeFromTeam}
              isInTeam={team.some(p => p.id === pokemon.id)}
              disableAdd={team.length >= 3 && !team.some(p => p.id === pokemon.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default TeamBuilder;
