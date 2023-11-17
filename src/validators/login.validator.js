import Joi from 'joi';
import userSchema from './users.validator';

export default Joi.object({
  email: userSchema.extract('email'),
  password: userSchema.extract('password'),
});
