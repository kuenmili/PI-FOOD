const createRecipeHandler= require('../handlers/recipesHandler');
const getByNameHandler = require('../handlers/recipesHandler');
const getByIdHandler = require('../handlers/recipesHandler');
const recipeRouter = require("express").Router();

recipeRouter.get('/:id', getByIdHandler);

recipeRouter.get('/', getByNameHandler);

recipeRouter.post('/', createRecipeHandler);


module.exports = recipeRouter;