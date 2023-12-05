const mongoose=require('mongoose');
const {Schema}=mongoose;
const productSchema=new Schema({
    id: {type:Number},
    title: {type:String, required:true},
    description: String,
    price: {type:Number, required: true, min:[0,"price can't be negative"],max:[999,"above maximum value"]},
    discountPercentage: {type:Number, required:true, min:[0,"below minimum value"], max:[50, "above maximum value"]},
    rating:{type:Number ,min:[0,"below minimum value"], max:[5,"above maximum value"]},
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    images: [String]
});
const Product=new mongoose.model('ecommerceData',productSchema);
exports.schema=Product;