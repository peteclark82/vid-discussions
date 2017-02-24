const mongoose = require('mongoose');

const section = module.exports = {  
  schema: mongoose.Schema({   
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: [true, "A Section must reference a video"]
    } 
  }),

  model: function(mongooseConnection) {
    const model = mongooseConnection.model('Section', section.schema);    

    return model;     
  }
};