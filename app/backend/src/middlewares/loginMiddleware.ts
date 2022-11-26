import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcryptjs';
import Users from '../database/models/Users';

export default async function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const login = await Users.findOne({ where: { email } });
  const compare = login && compareSync(password, login.password);
  if (!compare || !login) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
}
