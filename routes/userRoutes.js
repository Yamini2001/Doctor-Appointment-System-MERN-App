const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');

// Route to create a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = await UserModel.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to get all users
router.get('/users', async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to get a single user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to update a user
router.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await UserModel.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route to delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    await UserModel.deleteUser(req.params.id);
    res.status(200).json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
