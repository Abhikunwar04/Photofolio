import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email aur password dono chahiye' });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET as string,
  { expiresIn: '7d' }
);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
    user: { id: user._id, email: user.email, role: user.role },
  });
};

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400).json({ success: false, message: 'Admin already exists' });
    return;
  }

  const user = await User.create({ email, password, role: 'admin' });

  res.status(201).json({
    success: true,
    message: 'Admin created successfully',
    user: { id: user._id, email: user.email },
  });
};