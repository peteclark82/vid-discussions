module.exports = function(mongooseConnection) {
  return {
    User: require('./entities/user').model(mongooseConnection),
    Video: require('./entities/video').model(mongooseConnection),
    Section: require('./entities/section').model(mongooseConnection), 
    VideoField: require('./entities/videoField').model(mongooseConnection), 
  };  
}
