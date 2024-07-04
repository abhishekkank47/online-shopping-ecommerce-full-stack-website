import mongoose from "mongoose";

const categoryschema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    slug:{
        type: String,
        lowercase:true
    }
})

const categoryModel= mongoose.model("Category",categoryschema)

export default categoryModel