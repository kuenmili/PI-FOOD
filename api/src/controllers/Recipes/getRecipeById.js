const Recipe = require('../../models/Recipe')
const axios = require('axios');

const getRecipeById = async (id, source) => {
    const recipe = 
    source === 'api'
    ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information`)).data
    : await Recipe.findByPk(id);

    return recipe;    
};

module.exports = getRecipeById;