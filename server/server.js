const express = require(`express`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get(`/api/heroes`, (req, res) => {
  console.log('found heroes');
})

const server = app.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on port ${server.address().port}`);
});