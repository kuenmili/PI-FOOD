const axios = require('axios');
const { API_KEY } = process.env;


const getApiById = async (id) => {
    
    const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`);
    
    return data;
};

const getApiByName = async (name) => {

    const { data } = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&titleMatch=${name}&addRecipeInformation=true`)

    return data.results;
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