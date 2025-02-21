import mongoose from "mongoose"
const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type :mongoose.Schema.Types.ObjectId, //refrences from category model
        ref :"Category",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    shipping:{
        type:Boolean
    },
    photo:{
        data:Buffer,
        contentType:String
    }    

},{timestamps:true})
const ProductModel= mongoose.model('Products',ProductSchema)
export default ProductModel