const { Cart } = require("../model/Cart");

exports.fetchCartByUser=async(req,res)=>{
    const {user}=req.query;
try {
    const cartItems=await Cart.find({user:user}).populate('user').populate('product');
    res.status(200).json(cartItems);
} catch (error) {
    res.status(400).json(error);
}
}


exports.addToCart=async (req,res)=>{
  const cart=new Cart(req.body);
  try {
    const response=await cart.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}

exports.deleteFromCart=async(req,res)=>{
    const { id }=req.params;
    try {
     const cart=await  Cart.findByIdAndDelete(id);
     console.log(cart);
     res.status(200).json(cart);
   } catch (error) {
     res.status(400).json(error);
   }
   
  }




exports.updateCart=async(req,res)=>{
  const { id }=req.params;
  try {
   const cart=await  Cart.findByIdAndUpdate(id, req.body);
   console.log(cart);
   const result=await cart.populate('product');
   res.status(200).json(result);
 } catch (error) {
   res.status(400).json(error);
 }
 
}