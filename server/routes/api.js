const util = require('../util'), templates = require('../templates');


module.exports = (data) => {
  return (apiRoutes) => {
    apiRoutes.use(util.isAuthenticated);

    apiRoutes.get('/me', (req, res) => {
      res.json({ user: req.user });
    });

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

    apiRoutes.get('/video/detail-form', util.isAuthenticated, (req, res) => {
      res.status(200).json({ template: templates.default.video.dataTemplate });
    });

    apiRoutes.get('/video/detail-default-values', util.isAuthenticated, (req, res) => {
      res.status(200).json({ data: templates.default.video.defaultValues });
    });

    apiRoutes.get('/video/:videoId', util.isAuthenticated, (req, res) => {
      const videoId = req.params.videoId;
      data.Video.findOne({ _id : videoId }).then((video) => { 
        res.status(200).json({ video });
      });
    });

    apiRoutes.post('/video/:videoId/section', util.isAuthenticated, (req, res) => {
      const userId = req.user.id;
      const videoId = req.params.videoId;
      const { sectionName, timestamp } = req.body;

      var section = new data.Section({ video: videoId, name: sectionName, timestamp });
      section.save().then(() => {
        res.status(201).json({ section });
      }, ({ errors }) => {
        res.validationErrors(errors);
      });
    });

    apiRoutes.get('/video/:videoId/sections', util.isAuthenticated, (req, res) => {
      const videoId = req.params.videoId;

      data.Section.find({ video: videoId }).sort({ timestamp: 1 }).then((sections) => { 
        res.status(200).json({ sections });
      });
    });

    apiRoutes.post('/video/:videoId/detail', util.isAuthenticated, async (req, res) => {
      const userId = req.user.id;
      const videoId = req.params.videoId;
      const { detail } = req.body;

      var fields = [];

      for(let fieldName in detail) {
        let fieldValue = detail[fieldName];
        let videoField = new data.VideoField({ video: videoId, name: fieldName, value: fieldValue });
        try {
          await videoField.save();
        } catch ({ errors }) {
          res.validationErrors(errors);
          return;
        }
        fields.push(videoField);
      }

      res.status(201).json({ detail: fields });
    });

    apiRoutes.get('/video/:videoId/detail', util.isAuthenticated, async (req, res) => {
      const videoId = req.params.videoId;

      let videoFields;
      try {
        videoFields = await data.VideoField.find({ video: videoId });
      } catch({ errors }) {
        res.validationErrors(errors);
        return;
      }

      const videoDetail = {};
      for(let videoField of videoFields) {
        videoDetail[videoField.name] = videoField.value;
      }    

      res.status(200).json({ detail: videoDetail });
    });

    return apiRoutes;
  };
};