const { Recipe } = require('../../db');

const createRecipe = async ( 
    { title,
    healthScore,
    image,
    summary,
    steps } ) => {
    
    const recipe = await Recipe.create({
        healthScore,
        title,
        image,
        summary,
        steps,
    });   
    
    return recipe;
};

module.exports = createRecipe;