const mongoose=require('mongoose');
const {Schema}=mongoose;


const categorySchema=new Schema({
   lable: { type : String, required: true, unique: true},
    value: { type : String, required: true,unique:true},
   
})

const virtualId  =  categorySchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  productSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
categorySchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

exports.Category=mongoose.model('Category',categorySchema);