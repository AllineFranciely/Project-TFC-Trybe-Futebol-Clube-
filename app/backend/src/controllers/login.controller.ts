import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { statusCode, result } = await this.loginService.login(email, password);

    return res.status(statusCode).json(result);
  };

  public role = async (req: Request, res: Response) => {
    const { role } = req.body.user;

    return res.status(200).json({ role });
  };
}

export default LoginController;
