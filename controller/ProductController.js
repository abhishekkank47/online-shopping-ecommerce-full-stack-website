
import fs from 'fs'
import slugify from "slugify"
import ProductModel from '../config/models/productsModel.js'

// create product

const createProductController = async (req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        switch (true) {
            case !name:
                return res.status(400).send({
                    error:"NAME IS REQUIRED"
                })
            case !description:
                return res.status(400).send({
                    error:"DESCRIPTION IS REQUIRED"
                })  
            case !price:
                return res.status(400).send({
                    error:"PRICE IS REQUIRED"
                })  
            case !category:
                return res.status(400).send({
                    error:"CATEGORY IS REQUIRED"
                }) 
            case !quantity:
                return res.status(400).send({
                    error:"QUANTITY IS REQUIRED"
                })  
            case !shipping:
                return res.status(400).send({
                    error:"SHIPPING IS REQUIRED"
                })
            case photo && photo.size > 1000000:
                return res.status(400).send({
                    error:"PHOTO SHOULD BE LESS THAN 1 MB"
                })                           
        
        }

        const product = new ProductModel({...req.fields, slug:slugify(name)})


        if (photo){
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save()
        res.status(201).send({
            success:true,
            message:"PRODUCT IS CREATED SUCCESSFULLY",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"ERROR IN CREATING PRODUCT",
            error
        })
        
    }

}

// Update category controller

const updateProductController = async (req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        switch (true) {
            case !name:
                return res.status(400).send({
                    error:"NAME IS REQUIRED"
                })
            case !description:
                return res.status(400).send({
                    error:"DESCRIPTION IS REQUIRED"
                })  
            case !price:
                return res.status(400).send({
                    error:"PRICE IS REQUIRED"
                })  
            case !category:
                return res.status(400).send({
                    error:"CATEGORY IS REQUIRED"
                }) 
            case !quantity:
                return res.status(400).send({
                    error:"QUANTITY IS REQUIRED"
                })  
            case !shipping:
                return res.status(400).send({
                    error:"SHIPPING IS REQUIRED"
                })
            case photo && photo.size > 1000000:
                return res.status(400).send({
                    error:"PHOTO SHOULD BE LESS THAN 1 MB"
                })                           
        
        }

        const product = await ProductModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug:slugify(name)},{new:true})


        if (photo){
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }

        await product.save()
        res.status(201).send({
            success:true,
            message:"PRODUCT IS UPDATED SUCCESSFULLY",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"ERROR IN UPDATING PRODUCT",
            error
        })
        
    }
}

// Delete product controller

const deleteProductController = async (req,res)=>{
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success:true,
            message:"A PRODUCT DELETED SUCCESSFULLY",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"ERROR WHILE DELETING A PRODUCT",
            error
        })
        
    }
}

// Get all category controller

const getProductController = async (req,res)=>{
    try {
        const product = await ProductModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:"ALL PRODUCTS LISTS",
            Total_Products_Count:product.length,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"ERROR WHILE SHOWING ALL PRODUCTS",
            error
        })
        
    }
}

// Get single category controller

const getSingleProductController = async (req,res)=>{
    try {
        const product = await ProductModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
        res.status(200).send({
            success:true,
            message:"A PRODUCT FETCHED SUCCESSFULLY",
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message:"ERROR WHILE SHOWING A PRODUCT"
        })
        
    }
}

// Get Photo controller
const getProductPhotoController = async (req,res)=>{
    try {
        const product = await ProductModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
        product
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"ERROR WHILE SHOWING A PRODUCT PHOTO",
            error
        })
    }
}

export {createProductController, getProductController, getSingleProductController, getProductPhotoController, deleteProductController, updateProductController}