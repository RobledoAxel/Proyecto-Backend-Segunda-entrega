import { Router } from "express";
import productsService from "../managers/index.js";

const viewsRouter = Router();

viewsRouter.get("/",async (req,res)=>{
    const productos= await productsService.leerProduts()
    res.render("realtimeProducts",{
        productos
    });
})
//ver porque no anda los endpoints
viewsRouter.get("/products/:pid",async (req,res)=>{
    const producto = await productsService.getProductById(req.params.pid);
    if(!producto){
        res.render("404");
    }
    res.render("realTimeProducts",{
        producto,
        mainImage:producto.thumbails.filter(thumbnail=> thumbnail.main)
    })
})

export default viewsRouter;