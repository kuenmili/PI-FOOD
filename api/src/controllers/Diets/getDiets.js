const Diets = require('../../models/Diets');

const allDiets = async () => await Diets.findAll();

module.exports = allDiets;
