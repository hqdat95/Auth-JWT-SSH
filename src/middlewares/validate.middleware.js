import { BadRequest } from '../core/error.response';

export default (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);

      if (error) return next(new BadRequest(error.details[0].message));

      next();
    } catch (err) {
      return next(err);
    }
  };
};
