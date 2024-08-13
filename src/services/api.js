// src/services/api.js

const API_BASE_URL = 'https://pokeapi.co/api/v2'; // Définir l'URL de base de l'API

export const fetchPokemons = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=100`);
    const data = await response.json();
    return data.results.map(pokemon => ({
      id: pokemon.url.split('/')[6],
      name: pokemon.name
    }));
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    return [];
  }
};

export const fetchPokemonDetails = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
    const data = await response.json();
    return {
      id: data.id,
      name: data.name,
      hp: data.stats.find(stat => stat.stat.name === 'hp').base_stat,
      attack: data.stats.find(stat => stat.stat.name === 'attack').base_stat,
      defense: data.stats.find(stat => stat.stat.name === 'defense').base_stat,
      moves: data.moves.map(move => ({
        name: move.move.name,
        url: move.move.url,
      })),
    };
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return {};
  }
};

export const fetchMoveDetails = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      name: data.name,
      power: data.power || 0,
      type: data.type.name,
    };
  } catch (error) {
    console.error('Error fetching move details:', error);
    return {};
  }
};
