const util = require('../../util'), templates = require('../../templates');


module.exports = (data, apiRoutes) => {
  apiRoutes.get('/video/detail-form', util.isAuthenticated, (req, res) => {
    res.status(200).json({ template: templates.default.video.dataTemplate });
  });

  apiRoutes.get('/video/detail-default-values', util.isAuthenticated, (req, res) => {
    res.status(200).json({ data: templates.default.video.defaultValues });
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
};