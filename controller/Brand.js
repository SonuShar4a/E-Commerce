const { Brand } = require("../model/Brand")

exports.fetchBrand=async(req,res)=>{
try {
    const brand=await Brand.find({}).exec();
    res.status(200).json(brand);
} catch (error) {
    res.status(400).json(error);
}
}


exports.createBrand=async (req,res)=>{
  const brand=new Brand(req.body);
  try {
    const response=await brand.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}