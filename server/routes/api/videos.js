const util = require('../../util'), templates = require('../../templates');


module.exports = (data, apiRoutes) => {
  apiRoutes.post('/video', util.isAuthenticated, (req, res) => {
    const userId = req.user.id;
    const { videoUrl } = req.body;

    data.Video.createFromUrl({ videoUrl, userId }).then(video => {
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
    data.Video.findOne({ _id : videoId }).then((video) => { 
      res.status(200).json({ video });
    });
  }); 
};