const mongoose = require('mongoose');

const videoField = module.exports = {  
  schema: mongoose.Schema({   
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video',
      required: [true, "A VideoField must reference a video"]
    },
    name: {
      type: String,
      required: [true, "You must have a name for a VideoField"]
    },
    value: {
      type: Object
    }
  }),

  model: function(mongooseConnection) {
    const model = mongooseConnection.model('VideoField', videoField.schema);    

    return model;     
  }
};