const { Recipe, Diet } = require('../../db');


const getRecipesDb = async () => {
    
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    });
};

const getDbById = async (id) => {
   
    
    if (!id) throw new Error(`Id required`);

    const recipe = await Recipe.findByPk(id);

    console.log("en getDbById: " + recipe);
    
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