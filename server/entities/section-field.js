const mongoose = require('mongoose');

const sectionField = module.exports = {  
  schema: mongoose.Schema({   
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Section',
      required: [true, "A SectionField must reference a section"]
    },
    name: {
      type: String,
      required: [true, "You must have a name for a SectionField"]
    },
    value: {
      type: Object
    }
  }),

  model: function(mongooseConnection) {
    const model = mongooseConnection.model('SectionField', sectionField.schema);    

    return model;     
  }
};