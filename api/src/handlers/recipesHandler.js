const { Recipe, Diet } = require('../db')
const {
    getInfo,
    getInfoById,
    getInfoByName,
} = require('../controllers/Recipes/getAllInfo');



const createRecipeHandler = async (req, res) => {
   
        const {
            id,
            healthScore,
            title,
            image,
            summary,
            steps,
            diets,
        } = req.body;
        try {
            const recipe = await Recipe.create({
                id,
                pricePerServing,
                readyInMinutes,
                servings,
                healthScore,
                title,
                image,
                summary,
                cuisines,
                dishTypes,
                steps,
            });
            await recipe.addDiet(diets);
            res.status(201).json(recipe);
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
    const { name } = req.query;
    try {
        const recipes = name ? await getInfoByName(name) : await getInfo();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createRecipeHandler,
    getByIdHandler,
    getByNameHandler
};



/*const source = isNaN(id) ? 'bdd' : 'api'; 
    
    try {
        const recipe = await getRecipeById(id, source);

        res.status(200).json({ recipe : recipe.data });
        
    } catch (error) {
        res.status(400).send({ error : error.message })
    }*/