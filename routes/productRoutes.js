import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getProductPhotoController, getSingleProductController, updateProductController } from "../controller/ProductController.js";
import formidable from "express-formidable";

const productRouter = express.Router()

//create route
productRouter.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//update route
productRouter.put("/update-product/:pid", requireSignIn, isAdmin,formidable(), updateProductController )

//Delete Product route
productRouter.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProductController )

//Get all Product route
productRouter.get("/all-product", getProductController )

//Get single Product route
productRouter.get("/single-product/:slug", getSingleProductController )

// Get Photo
productRouter.get("/product-photo/:pid", getProductPhotoController )


export default productRouter