import fs from "fs"
import express, { Router } from "express"
import cartsService from "../managers/index.js"
import uploader from "../services/uploader.js";
import productsService from "../managers/index.js";


const apiCartsRouter = Router();   

apiCartsRouter.post("/",async (req,res)=>{
    try{
        const carritoNuevo= req.body;
        const newCart={
        id,
        productos:[],
    }
    for( let i=0; i< req.files.length;i++){
        newCart.productos.push(carritoNuevo);
    }
    const result = await cartsService.createCart(carritoNuevo)
    return res.send({status:`success!`,payload:`producto creado con id ${result}`})
    }
    catch(error){
        console.log(error);
        res.status(500).send({status:"error","error":error})
    }
}
)

apiCartsRouter.post("/:cid/product/:pid",async (req,res)=>{
const cid = req.params.cid;
const pid = req.params.pid;

if(isNaN(cid) || isNaN(pid)){
  return res.status(400).send({status:"error", error:"The parameter entered must be numeric."});
}
const carts = await cartsService.addProduct(cid,pid);
if(!carts){
  return res.status(404).send({status:"error", error:`The cart with id: ${cid} does not exist`});
}
const result = await cartsService.createCart(carts);
if(result == false){
  return res.status(500).send({status:"error",error:"The product could not be added"});
}
res.send({status:"success",message:`Product with id: ${pid} was added to cart with id: ${cid}`});
})

apiCartsRouter.get("/:cid",async (req,res)=>{
    const cid= req.params.cid;
    const id= parseInt(cid);
    const allCarts= cartsService.getCarts();
    const cart= allCarts.find(c =>c.id == id);
    if(!cart){ 
        return res.status(400).end(`error product not found ,number ${id} not exists in cart`);
    }
    res.send({status:`success!`,payloads: cart.productos})
})

export default apiCartsRouter;