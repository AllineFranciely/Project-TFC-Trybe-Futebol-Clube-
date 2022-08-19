import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../interfaces/UserInterface';

const secret = 'jwt_secret';

const tokenGenerate = async (payload: User) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: '2d',
    algorithm: 'HS256',
  });
  return token;
};

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const decode = jwt.verify(token, secret) as jwt.JwtPayload;

    req.body.user = decode;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export {
  tokenGenerate,
  tokenValidation,
};
