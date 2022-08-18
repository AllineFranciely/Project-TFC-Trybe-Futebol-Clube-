// import { Request, Response, NextFunction } from 'express';

// class LoginController {
//   static postLogin = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { email, password } = req.body;
//       const userData = await Validation.approvedValidation(email, password);

//       return res.status(200).json(userData);
//     } catch (error) {
//       next(error);
//     }
//   };

//   static getLogin = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { user: { role } } = req.body;
//       return res.status(200).json(role);
//     } catch (error) {
//       next(error);
//     }
//   };
// }

// export default LoginController;