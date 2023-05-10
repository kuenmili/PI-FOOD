const recipeRouter = require("express").Router();
const {
    createRecipeHandler,
    getByIdHandler,
    getByNameHandler
} = require('../handlers/recipesHandler');

recipeRouter.get('/:id', getByIdHandler);

recipeRouter.get('/', getByNameHandler);

recipeRouter.post('/', createRecipeHandler);
module.exports = recipeRouter;