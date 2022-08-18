import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UsersModel from '../database/models/Users';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const options: object = {
  algorithm: 'HS256',
  expiresIn: '10d',
};

export default class LoginService {
  public login = async (email: string, password: string) => {
    const user = await UsersModel.findOne({ where: { email } });

    if (user === null) {
      return { statusCode: 400, result: { message: 'All fields must be filled' } };
    }

    const enterPassword = bcryptjs.compareSync(password, user.password);

    if (!enterPassword) {
      return { statusCode: 401, result: { message: 'Incorrect email or password' } };
    }

    const payload = {
      email,
      id: user.id,
    };

    const token = jwt.sign(payload, secret, options);

    return { statusCode: 200, result: { token } };
  };
}
