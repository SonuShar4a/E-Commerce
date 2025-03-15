const { Order } = require("../model/Order");

exports.fetchOrdersByUser=async(req,res)=>{
    const {userId}=req.params;
try {
    const  orders=await Order.find({user:userId});
    res.status(200).json(orders);
} catch (error) {
    res.status(400).json(error);
}
}


exports.createOrder=async (req,res)=>{
  const cart=new Order(req.body);
  try {
    const response=await cart.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}

exports.deleteOrder=async(req,res)=>{
    const { id }=req.params;
    try {
     const  order=await  Order.findByIdAndDelete(id);
     res.status(200).json(order);
   } catch (error) {
     res.status(400).json(error);
   }
  }

  exports.updateOrder=async(req,res)=>{
    const { id }=req.params;
    try {
     const  order=await  Order.findByIdAndUpdate(id, req.body);
     res.status(200).json(order);
   } catch (error) {
     res.status(400).json(error);
   }
   
  }

  exports.fetchAllOrder=async(req,res)=>{
      
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}
    let query = Order.find({deleted:{$ne:true}});
    let totalOrderQuery=Order.find({});
 
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
     // totalProductQuery= totalProductQuery.sort({ [req.query._sort]: req.query._order });
    }
  
     const totalDocs=await totalOrderQuery.countDocuments().exec();
     console.log(totalDocs);
     
  
  
    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      query = query.skip(pageSize * (page - 1)).limit(pageSize);
    }
    try {
      const docs = await query.exec();
      // console.log(docs);
      
      res.set('X-Total-Count',totalDocs);
      res.status(200).json(docs);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  