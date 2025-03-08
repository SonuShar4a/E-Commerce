 
const express=require('express');
const server=express();
const mongoose=require('mongoose');
const productRoutes=require('./routes/Products')
const brandRoutes=require('./routes/Brand')
const categoryRoutes=require('./routes/Category')
const bodyParser = require('body-parser');
const cors=require('cors');


server.use(cors({
    exposedHeaders:['X-Total-Count']
}))
server.use(bodyParser.json());
server.use('/products',productRoutes.router);
server.use('/categories',categoryRoutes.router);
server.use('/brands',brandRoutes.router);
main().catch(err=>console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce');
    console.log("Mongodb Connected");
    
}

server.get('/',(req,res)=>{
    res.json({status:"success"})
})

 

server.listen(8080,()=>{
    console.log("server start");
    
})