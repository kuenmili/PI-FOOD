const Recipe = require('../../models/Recipe');
const { API_KEY } = process.env;
const axios = require('axios');


const saveDietsToDb = async () => {
    const newDiets = [
        'gluten free',
        'ketogenic',
        'dairy free',
        'vegan',
        'lacto ovo vegetarian',
        'pescatarian',
        'paleolithic',
        'fodmap friendly',
        'paleo',
        'primal',
        'whole 30',
    ];
    const dietsPms = newDiets.map((d) => {
        return Diet.create({ name: d });
    });
    await Promise.all(dietsPms);
};


module.exports = saveDietsToDb;














/*const saveApiOnDb = async () => {

    const api = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?api_key=${API_KEY}&number=100&addRecipeInformation=true&&instructionsRequired=true`).data;

    const toDb = api.results.map( async (recipe) => {
        const dbRecipe = await Recipe.create({
            id: recipe.id,
            name: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            healthScore: recipe.healthScore,
            stepByStep: recipe.analyzedInstructions[0]?.steps.map((element) => {
                return {
                  number: element.number,
                  step: element.step,
                };
              }),
        });
        const dbDiet = await Diets.findAll({
            where: { name: recipe.diets }
        });
        await dbRecipe.addDiet(dbDiet);
    });
};

module.exports = saveApiOnDb;*/