require(`dotenv`).config();
const express = require(`express`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);

const mockData = require(`./scripts/mockData`);
const Hero = require(`./models/Hero`);
const populateDB = require(`./scripts/populateDB`);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URL_LOCAL).catch(error => {
  console.error(`MongoDB connection error: ${error}`);
});

// populate local DB with mockData
Hero.count().then(number => {
  if (number > 0) {
    console.log(`Found ${number} Hero documents.`);
  } else {
    console.log(`Adding Heroes to DB`);
    populateDB(mockData.data);
  }
})
.catch(e => console.log(e));

app.get(`/api/heroes`, (req, res) => {
  Hero.find({})
    .then(data => res.json(data))
    .catch(e => console.log(e));
})

const server = app.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on port ${server.address().port}`);
});
