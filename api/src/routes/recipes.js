const recipeRouter = require("express").Router();
const {
    createRecipeHandler,
    getByIdHandler,

    getByNameHandler,
    recipesDelete
} = require('../handlers/recipesHandler');

recipeRouter.get('/:id', getByIdHandler);

recipeRouter.get('/', getByNameHandler);

recipeRouter.post('/', createRecipeHandler);

recipeRouter.delete('/:id', recipesDelete);

module.exports = recipeRouter;