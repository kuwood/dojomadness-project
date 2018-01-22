const express = require(`express`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = app.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on port ${server.address().port}`);
});