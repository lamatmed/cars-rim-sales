/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import User from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Car from './models/Car.js';
import Order from './models/Order.js';
// Inscription
export async function registerAction({ firstName, lastName, phone, password, imageUrl } :any) {
  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) return { error: 'Téléphone déjà utilisé' };
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      phone,
      password: hashedPassword,
      imageUrl
    });
    await user.save();
    return { message: 'Utilisateur créé', user: { ...user._doc, password: undefined } };
  } catch (err) {
  if (err instanceof Error) {
    return { error: err.message };
  } else {
    return { error: "Une erreur inconnue s'est produite." };
  }
}

}

// Connexion
export async function loginAction({ phone, password }) {
  try {
    const user = await User.findOne({ phone });
    if (!user) return { error: 'Utilisateur non trouvé' };
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { error: 'Mot de passe incorrect' };
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    return { token, user: { ...user._doc, password: undefined } };
  } catch (err) {
  if (err instanceof Error) {
    return { error: err.message };
  } else {
    return { error: "Une erreur inconnue s'est produite." };
  }
}

}

// Obtenir tous les utilisateurs
export async function getAllUsersAction() {
  try {
    const users = await User.find().select('-password');
    return users;
  } catch (err) {
  if (err instanceof Error) {
    return { error: err.message };
  } else {
    return { error: "Une erreur inconnue s'est produite." };
  }
}

}

// Obtenir un utilisateur par ID
export async function getUserByIdAction(id) {
  try {
    const user = await User.findById(id).select('-password');
    if (!user) return { error: 'Utilisateur non trouvé' };
    return user;
  } catch (err) {
    return { error: err.message };
  }
}

// Mise à jour utilisateur
export async function updateUserAction(id, { firstName, lastName, imageUrl }) {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, imageUrl },
      { new: true }
    ).select('-password');
    if (!user) return { error: 'Utilisateur non trouvé' };
    return user;
  } catch (err) {
    return { error: err.message };
  }
}

// Suppression utilisateur
export async function deleteUserAction(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return { error: 'Utilisateur non trouvé' };
    return { message: 'Utilisateur supprimé' };
  } catch (err) {
    return { error: err.message };
  }
}

// Obtenir toutes les voitures
export async function getAllCarsAction() {
  try {
    const cars = await Car.find().populate('owner', '-password');
    return cars;
  } catch (err) {
    return { error: err.message };
  }
}

// Obtenir une voiture par ID
export async function getCarByIdAction(id) {
  try {
    const car = await Car.findById(id).populate('owner', '-password');
    if (!car) return { error: 'Voiture non trouvée' };
    return car;
  } catch (err) {
    return { error: err.message };
  }
}

// Créer une nouvelle voiture
export async function createCarAction(carData) {
  try {
    const car = new Car(carData);
    await car.save();
    return car;
  } catch (err) {
    return { error: err.message };
  }
}

// Mettre à jour une voiture
export async function updateCarAction(id, carData) {
  try {
    const car = await Car.findByIdAndUpdate(id, carData, { new: true });
    if (!car) return { error: 'Voiture non trouvée' };
    return car;
  } catch (err) {
    return { error: err.message };
  }
}

// Supprimer une voiture
export async function deleteCarAction(id) {
  try {
    const car = await Car.findByIdAndDelete(id);
    if (!car) return { error: 'Voiture non trouvée' };
    return { message: 'Voiture supprimée' };
  } catch (err) {
    return { error: err.message };
  }
}

// Obtenir toutes les commandes
export async function getAllOrdersAction() {
  try {
    const orders = await Order.find().populate('car').populate('user');
    return orders;
  } catch (err) {
    return { error: err.message };
  }
}

// Obtenir une commande par ID
export async function getOrderByIdAction(id) {
  try {
    const order = await Order.findById(id).populate('car').populate('user');
    if (!order) return { error: 'Commande non trouvée' };
    return order;
  } catch (err) {
    return { error: err.message };
  }
}

// Créer une nouvelle commande
export async function createOrderAction(orderData) {
  try {
    const order = new Order(orderData);
    await order.save();
    return order;
  } catch (err) {
    return { error: err.message };
  }
}

// Mettre à jour une commande
export async function updateOrderAction(id, orderData) {
  try {
    const order = await Order.findByIdAndUpdate(id, orderData, { new: true }).populate('car').populate('user');
    if (!order) return { error: 'Commande non trouvée' };
    return order;
  } catch (err) {
    return { error: err.message };
  }
}

// Supprimer une commande
export async function deleteOrderAction(id) {
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) return { error: 'Commande non trouvée' };
    return { message: 'Commande supprimée' };
  } catch (err) {
    return { error: err.message };
  }
} 