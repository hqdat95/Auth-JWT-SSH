import bcrypt from 'bcryptjs';
import User from '../models/users.model';
import { BadRequest } from '../core/error.response';

class RegisterSvc {
  static create = async ({ username, email, password }) => {
    const isExists = await User.findOne({ email }).exec();

    if (isExists) throw new BadRequest('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    return await User.create({ username, email, password: hashedPassword });
  };
}

export default RegisterSvc;
