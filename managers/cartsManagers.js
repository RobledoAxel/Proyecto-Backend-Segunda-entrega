import fs from "fs"; 
import express from "express";
import __dirname from "../utils.js";

export default class CartsManagers{
  constructor(){
    this.PATH= `${__dirname}/db/Carts.json`
    this.init()
  } 
  async init(){
    if(fs.existsSync(this.PATH)){
      console.log(`ok.`)
    }else{
      try{ 
        console.log(`creando un nuevo carrito de compras`)
        await fs.promises.writeFile(this.PATH,JSON.stringify([]))
      }catch(error){
        console.log(`el carrito no pudo crearse.error: ${error}`)
        process.exit(1);
        }
    }
    }
  async getCarts(){
    try{ 
      const data= fs.promises.readFile(this.PATH,"utf-8")
      return JSON.parse(data);
    }catch(error){
      console.log(error);
      process.exit(1);
    }
    }
  createCart= async (cart)=>{
    //obtengo el carrito creado
    const carts= await this.getCarts() 
    //chequeo de la existencia de carritos.    
    if(!carts){
      console.log(`aun no existen carritos de compras.`)
      return -1;
      }
    //manipulacion de objetos con su id
    if(carts.length === 0){
      carts.id=1;
    }else{
      cart.id= carts[carts.length -1].id +1;
    }
    carts.push(cart);
    await fs.promises.writeFile(this.PATH,JSON.stringify(carts,null,"\t"))
    console.log(`el carrito ${cart.id} ah sido creado correctamente`)
    return cart.id;
}
  counterToId = async (idProductos) =>{
    const acum=0;
    for(let i=0; i<idProductos;i++){
      acum=acum +1;
    }
    return acum;
  }

async addProduct (cartId, productId){
const carts = await this.getCarts();
const cartIndex = carts.findIndex((cart) => {
    return cart.id == cartId;
  })
  if(cartIndex === -1){
    return null;
  }
const productIndex = carts[cartIndex].products.findIndex((prod) =>{
  return prod.productId == productId;
});
if(productIndex === -1){
  carts[cartIndex].products.push({ productId, quantity: 1 });
}else{
  carts[cartIndex].products[productIndex].quantity ++;
  }
  return carts;
}
}