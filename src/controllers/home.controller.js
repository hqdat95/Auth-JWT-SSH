import HomeSvc from '../services/home.service';

class HomeCtrl {
  home = async (req, res) => {
    await HomeSvc.home();

    res.ok({ Authentication: 'Successfully' });
  };
}

export default new HomeCtrl();
