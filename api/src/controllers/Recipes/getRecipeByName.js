/*const { Recipe } = require('../../db');
require('dotenv').config();
const { API_KEY } = process.env;
const { Op } = require('sequelize');
const axios = require('axios');
 

const getRecipeByName = async (name) => {
    
    const recipe = await Recipe.findAll({
        where: { name: { [Op.iLike]: `%${name}%` } },
    });

    const dbRecipes = await Promise.all(
        recipe.map(async (elem) => {
          const diet = await elem.getDiets();
          const dietName = diet.map((element) => element.name);
          return { ...elem.toJSON(), diets: dietName };
        })
    );

    const apiRecipes = await axios(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&&titleMatch=${name}&&addRecipeInformation=true&&instructionsRequired=true`
    );

    const data = apiRecipes.data;
        
    if (!data) return dbRecipes;
      
    else {
        const recipeDetail = data.results.map((recipe) => {
            return {
              id: recipe.id,
              name: recipe.title,
              image: recipe.image,
              healthScore: recipe.healthScore,
              summary: recipe.summary,
              diets: recipe.diets,
              steps: recipe.analyzedInstructions[0]?.steps.map((element) => {
                return {
                  number: element.number,
                  step: element.step,
                };
              }),
            };
        });
    
        return [...dbRecipes, ...recipeDetail];
    };
       
};

module.exports = getRecipeByName;*/