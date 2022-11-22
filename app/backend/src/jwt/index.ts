import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

interface createToken {
  id: number,
  role: string,
  email:string,
  username: string,
}

export default class JwtService {
  createToken = (data: createToken) => {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = jwt.sign(data, secret);
    return token;
  };

  validateToken = (token: string): jwt.JwtPayload => {
    try {
      const secret = process.env.JWT_SECRET || 'jwt_secret';
      const validation = jwt.verify(token, secret);
      return validation as jwt.JwtPayload;
    } catch (error) {
      const erro = new Error('Token must be a valid token');
      throw erro;
    }
  };
}
