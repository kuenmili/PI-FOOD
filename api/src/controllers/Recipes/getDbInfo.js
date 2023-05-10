const { Recipe, Diet } = require('../../db');
const { Op } = require('sequelize');

const getRecipesDb = async () => {
    
    const recipes = await Recipe.findAll();
    
    const recipesWithDiets = await Promise.all(
        recipes.map(async (element) => {
            const diets = await element.getDiets();
            const dietsName = diets.map((diet) => diet.name);
            return { ...element.toJSON(), diets: dietsName };
        })
    );

    return recipesWithDiets;
};

const getDbById = async (id) => {
    
    if (!id) throw new Error(`Id required`);

    const recipe = await Recipe.findByPk(id);
    
    if (!recipe) return;

    const diets = await recipe.getDiets();
    
    const dietsName = diets.map((diet) => diet.name);
    
    return { ...recipe.toJSON(), diets: dietsName };
};

const getDbByName = async (name) => {
    
    const recipe = await Recipe.findAll(
        {
            where: {
                title: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        },
        {
            include: {
                model: Diet,
                through: {
                    attributes: [],
                },
            },
        }
    );
    
    if (!recipe) throw new Error(`There does not exist recipes with name: ${name}`);
    
    return recipe;
};

module.exports = {
    getRecipesDb,
    getDbById,
    getDbByName,
};