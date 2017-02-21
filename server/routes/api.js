const ObjectID = require('mongodb').ObjectID

const util = require('../util');


module.exports = (data) => {
  return (apiRoutes) => {
    apiRoutes.use(util.isAuthenticated);

    apiRoutes.get('/me', (req, res) => {
      res.json({ user: req.user });
    });

    apiRoutes.post('/video', util.isAuthenticated, (req, res) => {
      const userId = req.user.id;
      const { videoUrl } = req.body;

      data.Video.createFromUrl({ videoUrl }).then(video => {
        video.save().then(() => {
          res.status(201).json({ video });
        }, ({ errors }) => {
          res.validationErrors(errors);
        });
      }, ({ errors }) => {
        res.validationErrors(errors);
      });      
    });

    apiRoutes.get('/video/top10', util.isAuthenticated, (req, res) => {
      data.Video.find().sort({ _id: -1 }).limit(10).then((videos) => { 
        res.status(200).json({ videos });
      });
    });

    apiRoutes.get('/video/:videoId', util.isAuthenticated, (req, res) => {
      const videoId = req.params.videoId;
      data.Video.findOne({ _id : ObjectID(videoId) }).then((video) => { 
        res.status(200).json({ video });
      });
    });

    return apiRoutes;
  };
};