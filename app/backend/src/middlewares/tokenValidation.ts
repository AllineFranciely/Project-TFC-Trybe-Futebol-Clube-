import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = 'jwt_secret';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decode = jwt.verify(token, secret) as jwt.JwtPayload;

    req.body.user = decode;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default tokenValidation;
