const util = require('../util'), templates = require('../templates');


module.exports = (data) => {
  return (apiRoutes) => {
    apiRoutes.use(util.isAuthenticated);

    apiRoutes.get('/me', (req, res) => {
      res.json({ user: req.user });
    });

    require('./api/video-details')(data, apiRoutes);
    require('./api/sections')(data, apiRoutes);
    require('./api/videos')(data, apiRoutes);

    return apiRoutes;
  };
};