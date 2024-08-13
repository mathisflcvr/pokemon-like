// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialisation de l'application Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour traiter les données JSON
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Schémas de base de données
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pokemon' }],
});

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  hp: { type: Number, required: true },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
});

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  power: { type: Number, required: true },
  accuracy: { type: Number, required: true },
});

// Modèles
const User = mongoose.model('User', userSchema);
const Pokemon = mongoose.model('Pokemon', pokemonSchema);
const Skill = mongoose.model('Skill', skillSchema);

// Routes API

// Route pour récupérer les utilisateurs
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour ajouter un utilisateur
app.post('/api/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    team: req.body.team,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour récupérer les Pokémon
app.get('/api/pokemons', async (req, res) => {
  try {
    const pokemons = await Pokemon.find();
    res.json(pokemons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour ajouter un Pokémon
app.post('/api/pokemons', async (req, res) => {
  const pokemon = new Pokemon({
    name: req.body.name,
    type: req.body.type,
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
  });

  try {
    const newPokemon = await pokemon.save();
    res.status(201).json(newPokemon);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour récupérer les compétences
app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour ajouter une compétence
app.post('/api/skills', async (req, res) => {
  const skill = new Skill({
    name: req.body.name,
    type: req.body.type,
    power: req.body.power,
    accuracy: req.body.accuracy,
  });

  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
