Pokemon-like
Description
pokemon-like est un jeu web permettant aux joueurs de créer une équipe de Pokémon, de sélectionner des Pokémon pour des combats et de simuler des batailles entre eux. L'application utilise l'API Pokémon pour obtenir des informations sur les Pokémon et leurs mouvements.

Structure du Projet
Le projet est organisé en plusieurs composants et fichiers qui gèrent différentes parties de l'application. Voici une vue d'ensemble des composants principaux :

1. PokemonCard.js
Le composant PokemonCard affiche les informations d'un Pokémon sous forme de carte. Il permet d'ajouter ou de retirer un Pokémon de l'équipe.

Props :

pokemon: Objet contenant les informations du Pokémon.
addToTeam: Fonction pour ajouter un Pokémon à l'équipe.
removeFromTeam: Fonction pour retirer un Pokémon de l'équipe.
isInTeam: Booléen indiquant si le Pokémon est déjà dans l'équipe.
disableAdd: Booléen pour désactiver le bouton d'ajout si l'équipe est pleine.
Fonctionnalités :

Affichage de l'image et du nom du Pokémon.
Boutons pour ajouter ou retirer le Pokémon de l'équipe.
2. TeamBuilder.js
Le composant TeamBuilder permet aux utilisateurs de créer leur équipe de Pokémon et de préparer des batailles. Il gère également la sélection de Pokémon ennemis et les mouvements des Pokémon.

State :

team: État du contexte contenant l'équipe actuelle.
pokemons: Liste des Pokémon récupérés depuis l'API.
selectedEnemy, selectedPlayer: Pokémon sélectionnés pour la bataille.
battleResult: Résultat de la bataille.
playerMove, availableMoves, enemyMoves: Mouvements disponibles pour les Pokémon.
Fonctionnalités :

Ajouter ou retirer des Pokémon de l'équipe.
Sélectionner un Pokémon joueur et un Pokémon ennemi pour le combat.
Choisir un mouvement pour le Pokémon joueur.
Commencer une bataille et afficher le résultat.
3. BattlePage.js
Le composant BattlePage affiche les Pokémon dans l'équipe et permet de commencer une bataille simple en sélectionnant un gagnant aléatoire pour la démonstration.

State :

team: État du contexte contenant l'équipe actuelle.
Fonctionnalités :

Afficher les Pokémon dans l'équipe.
Bouton pour commencer une bataille avec un gagnant aléatoire.
4. api.js
Le fichier api.js contient des fonctions pour interagir avec l'API Pokémon.

Fonctions :
fetchPokemons(): Récupère une liste de Pokémon avec leurs IDs et noms.
fetchPokemonDetails(id): Récupère les détails d'un Pokémon spécifique par son ID.
fetchMoveDetails(url): Récupère les détails d'un mouvement spécifique par son URL.
5. TeamContext.js
Le fichier TeamContext.js définit le contexte pour gérer l'état de l'équipe de Pokémon.

Composants :
TeamContext: Contexte pour stocker l'équipe de Pokémon.
TeamProvider: Fournisseur de contexte pour envelopper les composants nécessitant l'accès à l'équipe.
Installation
Clonez le dépôt :

bash
Copier le code
git clone https://github.com/mathisflcvr/pokemon-like
Accédez au répertoire du projet :

bash
Copier le code
cd pokemon-like 
Installez les dépendances :

bash
Copier le code
npm install
Démarrez le serveur de développement :

bash
Copier le code
npm start
L'application sera disponible à http://localhost:3000.

Structure des Dossiers
src/components/ : Contient les composants React.
src/contexts/ : Contient le contexte de l'équipe de Pokémon.
src/services/ : Contient les services pour interagir avec l'API Pokémon.
src/pages/ : Contient les pages principales de l'application.
public/images/ : Contient les images de fond utilisées dans l'application.
Styles
src/components/HomePage.css : Styles pour la page d'accueil.
src/components/TeamBuilder.css : Styles pour le constructeur d'équipe.

Schéma d'architecture back :

+------------------------+          +--------------------+
|                        |          |                    |
|   User Interface       |          |   Backend Services |
|                        |          |                    |
+------------------------+          +--------------------+
          |                                |
          |                                |
          v                                v
+------------------+              +--------------------------+
|  TeamBuilder.js  |              |     api.js                |
|                  |              |                          |
| - team            |   <------> | - fetchPokemons()        |
| - pokemons        |   <------> | - fetchPokemonDetails(id) |
| - selectedEnemy   |              | - fetchMoveDetails(url)  |
| - selectedPlayer  |              +--------------------------+
| - battleResult    |
| - playerMove      |
| - availableMoves  |
| - enemyMoves      |
|                  |
+------------------+
          |
          |
          v
+------------------+              
|  PokemonCard.js  |              
|                  |              
| - pokemon        |              
| - addToTeam      |              
| - removeFromTeam |              
| - isInTeam       |              
| - disableAdd     |              
|                  |              
+------------------+              

+------------------------+              
|                        |              
|   TeamContext.js       |              
|                        |              
| - TeamContext          |              
| - TeamProvider         |              
|                        |              
+------------------------+              
          |                               
          |                               
          v                               
+------------------------+               
|                        |               
|   BattlePage.js        |               
|                        |               
| - team                  |               
|                        |               
+------------------------+
