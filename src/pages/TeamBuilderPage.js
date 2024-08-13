import React, { useEffect, useState } from 'react';
import TeamBuilder from '../components/TeamBuilder';
import { fetchPokemons } from '../services/api';

const TeamBuilderPage = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const getPokemons = async () => {
      const data = await fetchPokemons();
      setPokemons(data);
    };
    getPokemons();
  }, []);

  return <TeamBuilder pokemons={pokemons} />;
};

export default TeamBuilderPage;
