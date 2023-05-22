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
const { Recipe } = require('../../db');



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
            console.log(dbRecipesId);
            return dbRecipesId;
        }
        
        throw new Error(`There does not exist a recipe with id: ${id}`);
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

/*const searchRecipesByName = async (req, res) => {
    const { name } = req.query;
    console.log(name);
    
    try {
      // Buscar en la base de datos local
      const dbRecipes = await getDbByName(name);
      // Realizar la solicitud al API externo
      const apiResponse = await getApiByName(name);
  
      // Combinar los resultados de la base de datos y del API externo
      const recipes = [...dbRecipes, ...apiResponse];
  
      res.json({ recipes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al buscar las recetas.' });
    }
  };*/
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
    getInfoByName
   // searchRecipesByName,
};