import LogoutSvc from '../services/logout.service';

class LogoutCtrl {
  logout = async (req, res) => {
    await LogoutSvc.logout(req.user);

    res.ok('Logged out successfully');
  };
}

export default new LogoutCtrl();
