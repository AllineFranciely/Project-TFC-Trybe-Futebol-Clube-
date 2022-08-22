import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import Users from '../database/models/Users';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const options: object = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

export default class LoginService {
  public login = async (email: string, password: string) => {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return { statusCode: 401, result: { message: 'Incorrect email or password' } };
    }

    const descriptPassword = bcryptjs.compareSync(password, user.password);

    if (!descriptPassword) {
      return { statusCode: 401, result: { message: 'Incorrect email or password' } };
    }

    const payload = {
      email,
      role: user.role,
    };

    const token = jwt.sign(payload, secret, options);

    return { statusCode: 200, result: { token } };
  };
}
