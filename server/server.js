require(`dotenv`).config();
const path = require('path');
const express = require(`express`);
const bodyParser = require(`body-parser`);
const mongoose = require(`mongoose`);

const mockData = require(`./scripts/mockData`);
const Hero = require(`./models/Hero`);
const populateDB = require(`./scripts/populateDB`);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const NODE_ENV = process.env.NODE_ENV || 'dev'
const dbURL = NODE_ENV === 'prod' ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_LOCAL

mongoose.Promise = global.Promise;
mongoose.connect(dbURL).catch(error => {
  console.error(`MongoDB connection error: ${error}`);
});

if (NODE_ENV === 'dev') {
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
}

app.use(express.static(path.join(__dirname, '../client/build')));

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

app.get(`/api/heroes/search`, function(req, res) {
  const query = req.query.q;
  Hero
    .$where(`this.attributes.slug.indexOf("${query}") !== -1`)
    .then(data => res.json(data))
    .catch(e => console.log(e))
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const server = app.listen(process.env.PORT || 8080, function () {
  console.log(`Listening on port ${server.address().port}`);
});
