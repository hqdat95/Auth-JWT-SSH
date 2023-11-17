import LoginSvc from '../services/login.service';

class LoginCtrl {
  login = async (req, res) => {
    const { email, password } = req.body;

    const result = await LoginSvc.login(email, password);

    res.ok(result);
  };
}

export default new LoginCtrl();
