const express = require('express');
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder, fetchAllOrder  } = require('../controller/Order');

const router=express.Router();

router.get('/user/:userId',fetchOrdersByUser)
      .post('/',createOrder)
      .delete('/:id',deleteOrder)
      .patch('/:id',updateOrder)
      .get('/',fetchAllOrder)


exports.router=router;
