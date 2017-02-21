const express = require('express'), bodyParser = require('body-parser'), session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('flash');

const util = require('./util');

const PORT = process.env.PORT || 3000, MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/vid-discussions';


/* configure data */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongooseConnection = mongoose.createConnection(MONGO_URL); 
const data = require('./data')(mongooseConnection);

/* setup server */
const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(session({
  secret: process.env.SESSION_SECRET || 'awesomecookiesecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongooseConnection,
  }),
}));
server.use(flash());
server.set('views', './views');
server.set('view engine', 'pug');
server.use(express.static('build'));
server.use(util.generalErrors());
server.use(util.validationErrors());

/* setup routes */
const routesAuth = require('./routes/auth')(data, server), routesWeb = require('./routes/web')(), routesApi = require('./routes/api')(data);
server.use('/auth', routesAuth(express.Router()));
server.use('/api', routesApi(express.Router()));
routesWeb(server);

/* start server */
server.listen(PORT, () => {
  console.log(`The App is listening on port ${PORT}`);
});