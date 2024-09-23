const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

// Register new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ success: true, message: 'User registered successfully!', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
};

// Logout user
exports.logout = (req, res) => {
  res.clearCookie('token'); // Clear the token from cookies
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};
