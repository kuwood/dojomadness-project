const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HeroSchema = new Schema(
  {
    "_id": {type: Number, required: true},
    "type": {type: String, required: true},
    "links": {type: Schema.Types.Mixed},
    "attributes": {type: Schema.Types.Mixed, required: true},
    "relationships": {type: Schema.Types.Mixed}
  }
);

module.exports = mongoose.model('Hero', HeroSchema, 'heroes');
