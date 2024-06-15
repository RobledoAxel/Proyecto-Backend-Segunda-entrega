import { Router } from "express";
import express from "express"
import productsService from "../managers/index.js";
import uploader from "../services/uploader.js";

const apiProductsRouter=Router();
apiProductsRouter.use(express.json());


apiProductsRouter.post("/",uploader.array("thumbnail",10),async (req,res)=>{
  try{
    const productoNuevo= req.body;
    const newProduct={
    title:productoNuevo.title,
    description:productoNuevo.description,
    code:productoNuevo.code,
    stock:productoNuevo.stock,
    price:productoNuevo.price,
    category:productoNuevo.category,
    thumbnails:[]
    }
  while(req.files){
    newProduct.thumbnails.push({mimetype:req.files[i].mimetype,path:`/files/${req.files[i].filename}`,main:i==0})
  }
  const result = await productsService.createProduct(newProduct)
  return res.send({status:`success!`,payload:`producto creado con id ${result}`})
  }
  catch(error){
    console.log(error);
    res.status(500).send({status:"error","error":error})
  }
}
)

apiProductsRouter.get("/",async (req,res)=>{
  const allProducts= await productsService.getProducts();
    if(allProducts === -1){
      return res.status(500).send({status:`error`,error:`error server`})
      }
  res.send({status:`success!`,payload: allProducts})
})

apiProductsRouter.get("/:pid",async (req,res)=>{
    const allProducts= await productsService.getProducts();
    const id = req.params.pid
    const Userid=parseInt(id)
    const user = allProducts.find(producto => producto.id == Userid)
    if(!user){
      return res.status(400).end(`error user not found`);
    }else{ 
      const result=user;
      res.send({status:`success!`,payloads: result})
    }
    }
)
apiProductsRouter.put("/:pid",async (req,res)=>{
  const allProducts = await productsService.getProducts();
  const id=req.params.pid;
  const Userid=parseInt(id);
  if(isNaN(Userid) ||Userid <=0 ||Userid > allProducts.length ){
    return res.status(400).send(`error: ${error}. id not found.`)
  }
  const user = allProducts.find(producto => producto.id === Userid)
  const productoNuevo= req.body;

  if(!user){
    return res.status(400).end(`error:${error}.User not found`);
  }else{
    allProducts.user={
  title: productoNuevo.title,
  description: productoNuevo.description,
  code: productoNuevo.code,
  stock: productoNuevo.stock,
  price: productoNuevo.price,
  category: productoNuevo.category,
  thumbnails:[]
  }
return res.send({status:`success! producto actualizado correctamente`})
}
}
)

apiProductsRouter.delete("/:pid",async(req,res)=>{
  const pid = req.params.pid
  const Userid=parseInt(pid) 
  if(isNaN(Userid) ||Userid <=0){
    return res.status(400).send(`error: ${error}`)
  }
  const productDelete = productsService.deleteProducts(Userid);
  return res.send({status:`success! producto eliminado correctamente`})
})

export default apiProductsRouter;