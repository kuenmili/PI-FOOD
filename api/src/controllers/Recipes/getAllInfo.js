const {
    getApi,
    getApiById,
    getApiByName,
} = require('./getApiInfo');
const {
    getRecipesDb,
    getDbById,
    getDbByName,
} = require('./getDbInfo');

// Obtener todas las recetas tanto de la api como de la base de datos
const getInfo = async () => {
    
    const apiRecipes = await getRecipesDb();
    
    const dbRecipes = await getApi();
    
    const allRecipes = apiRecipes.concat(dbRecipes);
   
    return allRecipes;
};

const getInfoById = async (id) => {
    
    if (!id) throw new Error(`Id required`);

    try {
        // información de la api
        const apiRecipesId = await getApiById(id);
        if (apiRecipesId) {
            const recipe = {
                healthScore: apiRecipesId.healthScore,
                title: apiRecipesId.title,
                image: apiRecipesId.image,
                summary: apiRecipesId.summary,
                steps: apiRecipesId.analyzedInstructions[0]?.steps,
                diets: apiRecipesId.diets,
            };

            return recipe;
        }
        // informacion de la db
        const dbRecipesId = await getDbById(id);
        if (dbRecipesId) {
            return dbRecipesId;
        }
        
        throw new Error(`There does not exist a recipe with id: ${id}`);
    } catch (error) {
        throw new Error(error);
    }
};

const getInfoByName= async (name) => {
    
    if (!name) throw new Error(`Name required`);
    
    try {
        const dbRecipes = await getDbByName(name);
        
        const apiRecipes = await getApiByName(name);
        
        const allRecipes = dbRecipes.concat(apiRecipes);
        
        return allRecipes;

    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    getInfo,
    getInfoById,
    getInfoByName,
};