module.exports = function(mongooseConnection) {
  return {
    Video: require('./entities/video').model(mongooseConnection),
    User: require('./entities/user').model(mongooseConnection) 
  };  
}
