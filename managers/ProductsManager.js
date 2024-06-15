import fs from "fs";
import express from "express";
import __dirname from "../utils.js";

export default class ProductsManagers{

    constructor(){
        this.PATH=`${__dirname}/db/Productos.json`;
        this.init();
    }
    //chequear y/o crear si no existe
    async init(){
        if(fs.existsSync(this.PATH)){
            console.log(`ok. la ruta ya existe`)
        }else{
            try{  
            console.log(`creando la nueva ruta...`)
            await fs.promises.writeFile(this.PATH,JSON.stringify([]))
            return console.log(`success.`);
            }catch(error){
                console.log(`el archivo no pudo crearse.error: ${error}`);
                process.exit(1)
            }
        }
    }
    //leer los productos
    getProducts= async ()=> {
        try{ 
        const data= await fs.promises.readFile(this.PATH,"utf-8")
        return JSON.parse(data);

        }catch(error){
            return console.log(`la lectura de archivos no pudo procesarse: ${error}`);
        }
    }  
    //carga de datos
    createProduct= async (product)=>{
        //obtengo el producto creado
        const productos= await this.getProducts() 
        //chequeo de la existencia de productos.    
        if(!productos){
            console.log(`aun no existen productos.`)
            return -1;
        }
        //manipulacion de objetos con su id
  if(productos.length === 0){
    product.id=1;
  }else{
    product.id= productos[productos.length -1].id +1;
  }
  productos.push(product);
   //vuelvo a ingresar todos los datos
  await fs.promises.writeFile(this.PATH,JSON.stringify(productos,null,"\t"))

  console.log(`el producto ${product.title} ah sido creado correctamente`);
  return product.id;
} 
async getProductById(id){
  const productos= await this.getProducts()
  const producto = productos.find(p => p.id == id);
  return producto;
  }
deleteProducts=async(id)=>{
  let products= await this.getProducts()
  let productFilter= await products.filter(products => products.id != id);
  await fs.promises.writeFile(this.PATH,JSON.stringify(productFilter,null,"\t"))
  return productFilter;
  }
}