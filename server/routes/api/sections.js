const mongoose = require('mongoose');
const util = require('../../util'), templates = require('../../templates');


module.exports = (data, apiRoutes) => {
  apiRoutes.get('/video/section-form', util.isAuthenticated, (req, res) => {
    res.status(200).json({ template: templates.default.section.dataTemplate });
  });

  apiRoutes.get('/video/section-default-values', util.isAuthenticated, (req, res) => {
    res.status(200).json({ detail: { name: "The Name", timestamp: 10, fields: templates.default.section.defaultValues }});
  }); 

  apiRoutes.post('/video/:videoId/section', util.isAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const videoId = req.params.videoId;
    const { detail } = req.body;

    var section = new data.Section({ video: videoId });
    try {
      await section.save();
    } catch ({ errors }) {
      res.validationErrors(errors); return;
    }

    var sectionDetail = new data.SectionDetail({ section: section._id, name: detail.name, timestamp: detail.timestamp });
    try {
      await sectionDetail.save();
    } catch ({ errors }) {
      res.validationErrors(errors); return;
    }

    var fields = [];
    for(let fieldName in detail.fields) {
      let fieldValue = detail.fields[fieldName];
      let sectionField = new data.SectionField({ section: section._id, name: fieldName, value: fieldValue });
      try {
        await sectionField.save();
      } catch ({ errors }) {
        res.validationErrors(errors); return;
      }
      fields.push(sectionField);
    }

    res.status(201).json({ section, sectionDetail, fields });
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
      details = (await data.SectionDetail.find({ section: { $in: sectionIds } })).map((detail) => detail.toJSON());
    } catch ({ errors }) {
      res.validationErrors(errors); return;
    }

    let sectionFields;
    try {
      sectionFields = await data.SectionField.find({ section: { $in: sectionIds }});
    } catch({ errors }) {
      res.validationErrors(errors);
      return;
    }

    for(let section of sections) {
      let currentDetail = details.find((detail) => String(detail.section) == String(section._id));      
      let currentFields = sectionFields.filter((sectionField) => String(sectionField.section) == String(section._id));      
      if (currentDetail !== undefined) {
        section.currentDetail = currentDetail;        
        if (currentFields !== undefined) {
          var fields={};
          for(let sectionField of currentFields) {
            fields[sectionField.name] = sectionField.value;
          }  
          currentDetail.fields = fields;
        }
      }      
    }

    sections.sort((a,b) => a.currentDetail.timestamp > b.currentDetail.timestamp);
    
    res.status(200).json({ sections });    
  });    
};