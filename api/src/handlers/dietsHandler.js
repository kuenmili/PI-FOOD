
const allDiets = require('../controllers/Diets/getDiets');

const getDietsHandler = async (req, res) => {
    try {
        const diets = await allDiets();
        res.status(200).send(diets)
    } catch (error) {
        res.status(400).send({error : error.message})
    }
};

module.exports = getDietsHandler;