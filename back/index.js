const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const keys = require('./config/keys');
const routes = require('./routes');

require('./services/passport');

mongoose.Promise = global.Promise;

mongoose
  .connect(
    process.env.NODE_ENV !== 'test' ? keys.mongoURI : keys.mongoURITest,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  )
  .catch(error => console.warn(error));
mongoose.connection.on('error', error =>
  console.warn('Warning', error.message),
);

const app = express();
app.use(express.static(path.join(__dirname, '../build')));

const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(passport.initialize());
app.use(passport.session());
routes(app);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
const PORT = process.env.PORT || 9000;
server.listen(9000, () => {
  console.log('Listen PORT', PORT);
});
module.exports = app;
