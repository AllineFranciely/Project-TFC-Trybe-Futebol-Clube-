import Login from '../interfaces/LoginInterfaces';
import Users from '../database/models/Users';
import { tokenGenerate } from '../middlewares/tokenValidation';

const userService = async (payload: Login) => {
  const login = await Users.findOne({ where: { email: payload.email } });

  if (!login) return null;

  const { id, username, email, role } = login;

  const token = await tokenGenerate({ id, username, email, role });

  return token;
};

export default userService;
