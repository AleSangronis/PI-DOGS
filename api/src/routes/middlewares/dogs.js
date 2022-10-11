const { Router } = require('express');
const router = Router();
const { getApi,getId,postDog,deleteDog }=require('../controllers/api-dogs.js')

  router.get("/", async(req,res)=>{
    const {name}=req.query
           try{ 
            let apiUnion=await getApi(name)
            if(apiUnion.length>0) return res.json(apiUnion)
            else {
                throw new Error("Raza inexistente") }}
    catch(e){
        res.status(404).json("Raza inexistente")
    }} )

    router.get("/:idRaza",async(req,res)=>{
        const { idRaza }=req.params
        try{
            let union=await getId(idRaza)
            console.log(union)
            res.json(union[0])
            
        }
        catch(e){
            res.status(404).json("ID Inexistente")
        } })

    router.post("/",async(req,res)=>{
        const {name,weightmax,weightmin,heightmax,heightmin,life,image,temperaments}=req.body
        try{
         const post=await postDog(name,weightmax,weightmin,heightmax,heightmin,life,image,temperaments)
         const todos= await getApi()
         res.status(200).json(todos)
       
         }
        catch(e){
         res.status(404).send(e)
        }
        })
    router.delete("/:id",async(req,res)=>{
        const {id}=req.params
        try{
            let eliminar=await deleteDog(id)
              res.json("perrito eliminado")
        }
        catch(e){
            res.status(404).send("no se encontro el perrito")
        }})

    router.get("*", (req,res)=>{
        res.send("Pagina not found")

    })

    



module.exports = router;