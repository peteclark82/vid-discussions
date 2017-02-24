const mongoose = require('mongoose');
const util = require('../../util'), templates = require('../../templates');


module.exports = (data, apiRoutes) => {
  apiRoutes.post('/video/:videoId/section', util.isAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const videoId = req.params.videoId;
    const { sectionName, timestamp } = req.body;

    var section = new data.Section({ video: videoId });
    try {
      await section.save();
    } catch ({ errors }) {
      res.validationErrors(errors); return;
    }

    var sectionDetail = new data.SectionDetail({ section: section._id, name: sectionName, timestamp });
    try {
      await sectionDetail.save();
    } catch ({ errors }) {
      res.validationErrors(errors); return;
    }

    res.status(201).json({ section, sectionDetail });
  });

  apiRoutes.get('/video/:videoId/sections', util.isAuthenticated, async (req, res) => {
    const videoId = req.params.videoId;

    let sections;
    try {
      sections = (await data.Section.find({ video: videoId })).map((section) => section.toJSON());
    } catch ({ errors }) {
      res.validationErrors(errors); return;
    }

    const sectionIds = sections.map((item) => item._id);
    let details;
    try {
      details = await data.SectionDetail.find({ section: { $in : sectionIds } });
    } catch ({ errors }) {
      res.validationErrors(errors); return;
    }

    for(let section of sections) {
      let detail = details.find((detail) => String(detail.section) == String(section._id));      
      if (detail != undefined) {
        section.currentDetail = detail;        
      }      
    }
    
    res.status(200).json({ sections });    
  });   
};