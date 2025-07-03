'use server'
import User from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Car from './models/Car.js';
// Inscription
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, imageUrl } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email déjà utilisé' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      imageUrl
    });
    await user.save();
    res.status(201).json({ message: 'Utilisateur créé', user: { ...user._doc, password: undefined } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Connexion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Mot de passe incorrect' });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, user: { ...user._doc, password: undefined } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir un utilisateur par ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mise à jour utilisateur
export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, imageUrl } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, imageUrl },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Suppression utilisateur
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 

// Obtenir toutes les voitures
export const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('owner', '-password');
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir une voiture par ID
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('owner', '-password');
    if (!car) return res.status(404).json({ error: 'Voiture non trouvée' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer une nouvelle voiture
export const createCar = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour une voiture
export const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) return res.status(404).json({ error: 'Voiture non trouvée' });
    res.json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une voiture
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ error: 'Voiture non trouvée' });
    res.json({ message: 'Voiture supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 