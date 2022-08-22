import { Request, Response } from 'express';
import loginService from '../services/login.service';

class LoginController {
  public login = async (req: Request, res: Response) => {
    const user = await loginService(req.body);

    return res.status(200).json({ token: user });
  };

  public role = (req: Request, res: Response) => {
    res.status(200).json({ role: req.body.user.role });
  };
}

export default LoginController;
