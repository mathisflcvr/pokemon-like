// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
      <div className="home-header">
      <img src="/images/pokemon.png" alt="Pokémon Logo" className="pokemon-logo" />
      <h1>Bienvenue dans le Monde des Pokémon</h1>
      <p className="creator-info">Créé par Mathis Folschveiller</p>
      </div>

        <h1>Bienvenue sur le jeu pokemon-fight</h1>
        <p>Créez votre team de pokemons et défiez des ennemis</p>
        <Link to="/team-builder" className="start-button">Commencer à créer mon équipe</Link>
      </header>
      <section className="home-info">
        <h2>Features</h2>
        <ul>
          <li>Sélectionnez jusqu'à 3 Pokémon</li>
          <li>Choisissez des attaques et votre pokemon à jouer</li>
          <li>Choisissez un ennemi manuellement ou aléatoirement</li>
        </ul>
      </section>
    </div>
  );
}

export default HomePage;
