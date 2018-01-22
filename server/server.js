const express = require(`express`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL_LOCAL).catch(error => {
  console.error(`MongoDB connection error: ${error}`);
});

app.get(`/api/heroes`, (req, res) => {
  console.log('found heroes');
})

const server = app.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on port ${server.address().port}`);
});