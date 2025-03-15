const { Product } = require("../model/Product")

exports.createProduct=async (req,res)=>{
  const product=new Product(req.body);
  try {
    const response=await product.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}

exports.fetchAllProducts=async(req,res)=>{
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  let condition={}
  if(!req.query.admin){
    condition.deleted={$ne:true}
  }
  let query = Product.find(condition);
  let totalProductQuery=Product.find(condition);
  if (req.query.category) {
    query = query.find({ category:req.query.category});
    totalProductQuery= totalProductQuery.find({ category:req.query.category});
  }
 

if (req.query.brand) {
    query = query.find({ brand:req.query.brand});
    totalProductQuery= totalProductQuery.find({ brand:req.query.brand});

  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
   // totalProductQuery= totalProductQuery.sort({ [req.query._sort]: req.query._order });
  }

   const totalDocs=await totalProductQuery.countDocuments().exec();
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


exports.fetchProductById=async(req,res)=>{
   const { id }=req.params;
   try {
    const product=await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
  
}

exports.fetchProductUpdate=async(req,res)=>{
  const { id }=req.params;
  try {
   const product=await Product.findByIdAndUpdate(id, req.body);
   console.log(product);
   res.status(200).json(product);
 } catch (error) {
   res.status(400).json(error);
 }
 
}