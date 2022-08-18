import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { statusCode, result } = await this.loginService.login(email, password);

    return res.status(statusCode).json(result);
  };
}
