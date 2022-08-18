// import * as Joi from 'joi';
// import { Request, Response, NextFunction } from 'express';
// import Login from '../interfaces/LoginInterfaces';

// const loginError = 'Incorrect email or password';

// const LoginSchema = Joi.object < Login >({
//   email: Joi.string().email().required().messages({
//     'string.empty': loginError,
//     'string.email': loginError,
//     'any.required': loginError,
//   }),
//   password: Joi.string().min(6).required()
//     .messages({
//       'string.empty': loginError,
//       'string.min': loginError,
//       'any.required': loginError,
//     }),
// });

// const loginValidate = (req: Request, res: Response, next: NextFunction) => {
//   const { error } = LoginSchema.validate(req.body);

//   if (error) {
//     const [message] = error.details.map((erro) => erro.message);

//     return res.status(401).json({ message });
//   }

//   return next();
// };

// export default loginValidate;
