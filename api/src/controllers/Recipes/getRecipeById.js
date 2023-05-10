/*onst Recipe = require('../../db');
const axios = require('axios');

const getRecipeById = async (id, source) => {
    const { API_KEY } = process.env;
   
    const recipe = source === 'api'
    ? await (axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`))
    : await Recipe.findByPk(id);

    return recipe;
};
  
module.exports = getRecipeById;*/

