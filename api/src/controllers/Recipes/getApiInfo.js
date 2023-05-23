const axios = require('axios');
const { API_KEY } = process.env;


const getApiById = async (id) => {
    
    const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    
    return data;
};

const getApiByName = async (name) => {

    const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&titleMatch=${name}&addRecipeInformation=true`)
   console.log(data.results);
   if(data.results){
    const recipes = data.results.map(recipe => {
        return{
            id: recipe.id,
            title: recipe.title,
            image: recipe.image,
            steps: recipe.analyzedInstructions[0]?.steps.map(step => (step.number, step.step)),
            summary: recipe.summary,
            diets: recipe.diets,
            healthScore: recipe.healthScore
        }
    })
    console.log(recipes);
    return recipes;
   }
}

const getApi = async () => {
    
    const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);

    return data.results;
};

module.exports = {
    getApiById,
    getApiByName,
    getApi
};