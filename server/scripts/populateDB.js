const Hero = require(`../models/Hero`);

function populateHeroes(heroes) {
  heroes.forEach(hero => {
    hero._id = parseInt(hero.id, 10);
    delete hero.id;
    const newHero = new Hero(hero);
    newHero.save().catch(e => console.log(`Error saving hero with id ${hero._id}: ${e}`));
  });
}

module.exports = populateHeroes;
