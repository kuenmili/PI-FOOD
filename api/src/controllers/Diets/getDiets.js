const Diets = require('../../models/Diets');

const allDiets = async (req, res) => {
    try {
         const dbDiets = await Diets.findAll();
         res.status(200).json(dbDiets);
    } catch (error) {
        res.status(400).send({ error : error.message })
    }  
       
};

module.exports = allDiets;
