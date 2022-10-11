const { getTemp }=require('../controllers/temperApi.js');
const { Router } = require('express');

const router = Router();

router.get("/", async(req,res)=>{
    try{
        let temperaments=await getTemp()
        res.json(temperaments)

    }
    catch(e){
        res.json(e)

    }
})

module.exports = router;