const recipeRouter = require('./recipes');
const dietRouter = require('./diets');
const { Router } = require('express');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeRouter);

router.use('/diets', dietRouter);

module.exports = router;
