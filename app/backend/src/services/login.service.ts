import Login from '../interfaces/LoginInterfaces';
import Users from '../database/models/Users';
import { tokenGenerate } from '../middlewares/tokenValidation';

const userService = async (payload: Login) => {
  const login = await Users.findOne({ where: { email: payload.email } });

  if (!login) throw new Error('usuário não encontrado');

  const { id, username, role, email } = login;

  const token = await tokenGenerate({ id, username, role, email });

  return {
    token,
  };
};

export default userService;
