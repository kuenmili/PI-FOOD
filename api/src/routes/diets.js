const dietRouter = require('express').Router();
const getDiets = require("../")

dietRouter.get('/', getDiets);


module.exports = dietRouter;