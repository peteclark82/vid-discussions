const mongoose = require('mongoose'), crypto = require('crypto');

const user = module.exports = {
  schema: mongoose.Schema({   
    username: {
      type: String,
      required: [true, "You must have a username"],
      unique: true
    },
    passwordHash: {
      type: String,
      required: [true, "You must have a hashed password"]
    },
    firstName: {
      type: String,
      required: [true, "You must have a first name"]
    },
    lastName: {
      type: String,
      required: [true, "You must have a last name"]
    },
    email: {
      type: String,
      required: [true, "You must have an email address"],
      unique: true      
    }    
  }),
  
  model: function(mongooseConnection) {
    const model = mongooseConnection.model('User', user.schema);

    model.getUserByUsernameAndPassword = ({ username, password }) => {
      const hashedPassword = crypto.createHash('md5').update(password).digest("hex");
      return model.findOne({ username, passwordHash: hashedPassword });
    };

    return model;     
  }
};