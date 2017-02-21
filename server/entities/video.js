const mongoose = require('mongoose');

const video = module.exports = {  
  schema: mongoose.Schema({   
    youTubeVideoId: {
      type: String,
      required: [true, "You must specify a YouTube video ID"]
    },
    userId: Number
  }),

  model: function(mongooseConnection) {
    const model = mongooseConnection.model('Video', video.schema);

    model.createFromUrl = ({ videoUrl }) => {
      return new Promise((resolve, reject) => {
        const patterns = [            
          /^https\:\/\/www\.youtube\.com\/watch\?v=(.+)$/,
          /^https\:\/\/www\.youtube\.com\/v\/(.+)$/
        ];

        var result = patterns.length > 0 ? patterns.shift().exec(videoUrl) : null;
        while(result == null && patterns.length > 0) {
          result = patterns.length > 0 ? patterns.shift().exec(videoUrl) : null;
        }

        if (result !== null) {
          const video = new model({ youTubeVideoId : result[1] });
          resolve(video);
        } else {
          reject({ 
            errors : {
              videoUrl : {
                message : `The URL is not recognised as a valid YouTube video : '${videoUrl}'`
              }
            }
          });
        }
      });
    };

    return model;     
  }
};