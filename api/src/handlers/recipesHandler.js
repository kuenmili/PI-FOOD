const { Recipe } = require('../db')
const {  
    getInfoById,
    getInfoByName,
    getInfo
} = require('../controllers/Recipes/getAllInfo');
const createRecipe = require('../controllers/Recipes/postRecipe')

const createRecipeHandler = async (req, res) => {   
    const {
        diets,
        healthScore,
        title,
        image,
        summary,
        steps,
    } = req.body;  
    try {
        const recipe = await createRecipe({
            healthScore,
            title,
            image,
            summary,
            steps,
        });
        diets.forEach(async (diet) => {            
            await recipe.addDiet(diet.value);
        });
        res.status(201).json('Recipe successfully created!');
    } catch (error) {        
        res.status(400).send({ error : error.message })
    }
};

const getByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {       
        const recipe = await getInfoById(id);
        res.status(200).json(recipe);
    } catch (error) {       
        res.status(400).json({ error: error.message });
    }
};

const getByNameHandler = async (req, res) => {
    
    const { title } = req.query;    
    try {
        const recipes = title ? await getInfoByName(title) : await getInfo();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const recipesDelete = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const recipeToDelete = await Recipe.findByPk(id);
        await recipeToDelete.destroy();
        res.status(200).json({
            msg: 'Recipe deleted succesfully',
            recipeDeleted: recipeToDelete,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = {
    createRecipeHandler,
    getByIdHandler,
    getByNameHandler,
    recipesDelete,
};



/*const source = isNaN(id) ? 'bdd' : 'api'; 
    
    try {
        const recipe = await getRecipeById(id, source);

        res.status(200).json({ recipe : recipe.data });
        
    } catch (error) {
        res.status(400).send({ error : error.message })
    }*/