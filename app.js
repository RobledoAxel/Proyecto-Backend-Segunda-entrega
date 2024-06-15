import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import viewsRouter from "./routes/viewsR.js";
import apiproductsrouter from "./routes/products.router.js"
import apiCartsRouter from "./routes/carts.router.js";


const app= express();
const PORT= process.env.PORT || 8080;

//Configuracion de handlebars
app.engine("handlebars",handlebars.engine())
app.set("views",`${__dirname}/views`);
app.set("view engine","handlebars");

///Middlewares 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));

//Routers
app.use("/api/products",apiproductsrouter);
app.use("/api/carts",apiCartsRouter);
app.use("/realtimeproducts",viewsRouter);

const server = app.listen(PORT,()=>console.log(`Server ok. Listen in PORT ${PORT}`));
const socketServer = new Server(server)

//cuando un cliente se conecte va a escuchar
socketServer.on('connection',(socketClient) => {
    console.log("Cliente Conectado");
    socketServer.emit('Producto agregado');
    socketClient.on('addProduct', data =>{
        console.log(`Se agrego el producto con el id ${data}`);
        socketServer.emit('Producto agregado');
    })
});