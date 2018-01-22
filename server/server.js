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
  const limit = 6;
  const page = parseInt(req.query.p, 10) || 1;

  Hero.find({})
    .find({})
    .sort(`_id`)
    .skip((limit * page) - limit)
    .limit(limit)
    .then(heroes => {
      Hero
        .count()
        .then(count => {
          const data = {
            heroes,
            page,
            pages: Math.ceil(count / limit)
          };
          res.json(data);
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
})

const server = app.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on port ${server.address().port}`);
});
