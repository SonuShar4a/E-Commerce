const mongoose=require('mongoose');
const {Schema}=mongoose;


const brandSchema=new Schema({
    value: { type : String, required: true},
   lable: { type : String, required: true},
   checked: { type: Boolean, default: false }
   
})

const virtualId  =  brandSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})
// we can't sort using the virtual fields. better to make this field at time of doc creation
// const virtualDiscountPrice =  productSchema.virtual('discountPrice');
// virtualDiscountPrice.get(function(){
//     return Math.round(this.price*(1-this.discountPercentage/100));
// })
brandSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})

exports.Brand=mongoose.model('Brand', brandSchema);