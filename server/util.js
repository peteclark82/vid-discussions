exports.isAuthenticated = function(req, res, next) {
  if (!req.user) {
    req.flash('error', 'You must be logged in.');
    return res.redirect('/login');
  }

  return next();
};

exports.hasScope = function(scope) {
  return (req, res, next) => {
    const { scopes } = req.user;

    if (!scopes.includes(scope)) {
      req.flash('error', 'The username and password are not valid.');
      return res.redirect('/login');
    }

    return next();
  };
};

exports.generalErrors = function() {
  return function (req, res, next) {
    res.generalErrors = function(errors) {
      res.status(500).json({ errors });        
    };
    next();
  };
};

exports.validationErrors = function() {
  return function (req, res, next) {
    res.validationErrors = function(validationErrors) {
      res.status(400).json({ validationErrors });        
    };
    next();
  };
};