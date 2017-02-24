const mongoose = require('mongoose');

const sectionDetail = module.exports = {  
  schema: mongoose.Schema({   
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: [true, "A SectionDetail must reference a section"]
    },
    name: {
      type: String,
      required: [true, "You must have a section name"]
    },
    timestamp: {
      type: Number,
      required: [true, "You must have a timestamp"]
    }
  }),

  model: function(mongooseConnection) {
    const model = mongooseConnection.model('SectionDetail', sectionDetail.schema);    

    return model;     
  }
};