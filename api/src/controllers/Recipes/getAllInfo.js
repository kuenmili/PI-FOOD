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

// Obtengo todas las recetas tanto de la api como de la base de datos
const getInfo = async () => {
    
    const apiRecipes = await getRecipesDb();
    
    const dbRecipes = await getApi();
    
    const allRecipes = apiRecipes.concat(dbRecipes);
   
    return allRecipes;
};

const getInfoById = async (id) => {
    
    if (!id) throw new Error(`Id required`);

    // información de la api
        if(Number(id))
        {
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
        }
        // informacion de la db
        const dbRecipesId = await getDbById(id);
        if (dbRecipesId) {           
            return dbRecipesId;
        }   
};


  const getInfoByName= async (name) => {
    
    if (!name) throw new Error(`Name required`);
    
        const dbRecipes = await getDbByName(name);
                
        const apiRecipes = await getApiByName(name);
                
        const allRecipes = dbRecipes.concat(apiRecipes);
        
        return allRecipes;
};

module.exports = {
    getInfo,
    getInfoById,
    getInfoByName
  };