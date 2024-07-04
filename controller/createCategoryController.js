import categoryModel from "../config/models/categoryModel.js"
import slugify from "slugify"

// Create category controller

const createCategoryController = async(req,res)=>{
    try {
        const {name}= req.body
        if(!name){
            return res.status(401).send({
                message:"NAME IS REQUIRED"
            })
        }

        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:"CATEGORY ALREADY EXIST"
            })
        }
        const category = await new categoryModel({name,slug:slugify(name)}).save()
        res.status(201).send({
            success:true,
            message:"NEW CATEGORY CREATED",
            category
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:"ERROR IN CATEGORY"
        })
        
    }
}

// Update category controller

const updateCategoryController = async (req,res)=>{
    try {
        const {name}=req.body
        const {id}=req.params
        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{name:true})
        res.status(200).send({
            success:true,
            message:"CATEGORY UPDATE SUCCESSFULLY",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:"ERROR WHILE UPDATING CATEGORY"
        })
        
    }
}

// Delete category controller

const deleteCategoryController = async (req,res)=>{
    try {
        const {id}=req.params
        const category = await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"A CATEGORY LIST DELETED SUCCESSFULLY",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"ERROR WHILE DELETING A CATEGORY",
            error
        })
        
    }
}

// Get all category controller

const getCategoryController = async (req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:"ALL CATEGORIES LISTS",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:"ERROR WHILE SHOWING ALL CATEGORY"
        })
        
    }
}

// Get single category controller

const getSingleCategoryController = async (req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:"GET A CATEGORY LIST SUCCESSFULLY",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:"ERROR WHILE SHOWING A CATEGORY"
        })
        
    }
}


export {createCategoryController, updateCategoryController, deleteCategoryController, getCategoryController, getSingleCategoryController }