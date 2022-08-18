// import * as bcryptjs from 'bcryptjs';
// import * as jwt, { SignOptions } from 'jsonwebtoken';
// import UserModel from '../database/models/Users';
// const { JWT_SECRET } = process.nextTick;

// const options: SignOptions = {
//   algorithm: 'HS256',
//   expiresIn: '10d',
// };

// export default class LoginService {
//   public login = async (email: string, password: string) => {
//     const user = await UserModel.findOne({ where: { email, password } });

//     if (!user) {
//       return { statusCode: 400, result: { message: 'All fields must be filled' } };
//     }

//     const token = bcryptjs.compareSync(password, user.password);

//     if(!token) {
//       return { statusCode: 401, resuot: { message: 'Incorrect email or password' } }
//     }
//     return user;
//   };
// }
