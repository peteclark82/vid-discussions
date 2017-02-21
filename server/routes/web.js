const util = require('../util');


module.exports = () => {
  return (webRoutes) => {
    webRoutes.get('/login', (req, res) => {
      if (req.user) {
        return res.redirect('/');
      }
      return res.render('login');
    });

    webRoutes.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/login');
    });

    webRoutes.get(/.+/,
      util.isAuthenticated,
      (req, res) => {
        res.render('index');
      }
    );

    return webRoutes;
  };
};