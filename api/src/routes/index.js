const { Router } = require('express');
// Importar todos los routers;
 const dogs = require('./middlewares/dogs.js');
 const temperament = require('./middlewares/temperaments.js');


const router = Router();

// Configurar los routers
router.use('/dogs', dogs);
router.use('/temperaments', temperament);

router.get("/", (req,res)=>{
    res.send("DOGS")
})


module.exports = router;
