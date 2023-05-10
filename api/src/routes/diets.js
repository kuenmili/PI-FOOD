const dietRouter = require('express').Router();
const getDietsHandler = require('../handlers/dietsHandler');

dietRouter.get('/', (req, res) => {
    getDietsHandler(req, res)
});


module.exports = dietRouter;