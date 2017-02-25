module.exports = function(mongooseConnection) {
  return {
    User: require('./entities/user').model(mongooseConnection),
    Video: require('./entities/video').model(mongooseConnection),
    Section: require('./entities/section').model(mongooseConnection), 
    SectionDetail: require('./entities/section-detail').model(mongooseConnection), 
    VideoField: require('./entities/video-field').model(mongooseConnection), 
    SectionField: require('./entities/section-field').model(mongooseConnection), 
  };  
}
