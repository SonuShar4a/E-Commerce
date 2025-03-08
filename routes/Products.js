const express=require('express');
const { createProduct, fetchAllProducts, fetchProductById, fetchProductUpdate } = require('../controller/Product');

const router=express.Router();

router.post('/',createProduct)
       .get('/',fetchAllProducts)
       .get('/:id',fetchProductById)
       .patch('/:id',fetchProductUpdate)

exports.router=router;