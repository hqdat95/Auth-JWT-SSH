import RegisterSvc from '../services/register.service';

class RegisterCtrl {
  register = async (req, res) => {
    const { username, email, password } = req.body;

    const result = await RegisterSvc.create({ username, email, password });

    res.created(result);
  };
}

export default new RegisterCtrl();
