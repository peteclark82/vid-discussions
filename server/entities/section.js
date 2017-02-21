const mongoose = require('mongoose');

const section = module.exports = {  
  schema: mongoose.Schema({   
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: [true, "A Section must reference a video"]
    },
    name: {
      type: String,
      required: [true, "You must have a section name"]
    },
    timestamp: {
      type: Number,
      required: [true, "You must have a timestamp for the section"]
    }
  }),

  model: function(mongooseConnection) {
    const model = mongooseConnection.model('Section', section.schema);    

    return model;     
  }
};