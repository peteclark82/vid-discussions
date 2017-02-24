const util = require('../../util'), templates = require('../../templates');


module.exports = (data, apiRoutes) => {
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
};