const { getApi } = require('../Recipes/getApiInfo');
const { Diet } = require('../../db');


const allDiets = async () => {
    
    const dbDiets = await Diet.findAll();
    if(dbDiets.length) {
        
        const diets = dbDiets.map(({id, name}) => ({value: id, text: name }));
        return diets;
    };
    
    const apiInfo = await getApi();

    const apiDiets = apiInfo.map(recipe => {
        const {diets} = recipe;
        return diets;
    });

    const diets = [...new Set(apiDiets.flat())];
    diets.forEach((diet, index) => Diet.create({id:index, name:diet}));

    return diets;
};

module.exports = allDiets;
