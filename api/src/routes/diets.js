const getDietsHandler = require('../handlers/dietsHandler');
const dietRouter = require('express').Router();

dietRouter.get('/', (req, res) => {
    getDietsHandler(req, res)
});


module.exports = dietRouter;