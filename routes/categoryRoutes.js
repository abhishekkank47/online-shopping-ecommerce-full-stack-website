import express from "express";
import {isAdmin, requireSignIn} from '../middleware/authMiddleware.js'
import {createCategoryController, deleteCategoryController, getCategoryController, getSingleCategoryController, updateCategoryController } from "../controller/createCategoryController.js";

const categoryRouter = express.Router()

//create route
categoryRouter.post("/create-category", requireSignIn, isAdmin, createCategoryController )

//update route
categoryRouter.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController )

//Delete Category route
categoryRouter.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController )

//Get all category route
categoryRouter.get("/all-category", getCategoryController )

//Get single category route
categoryRouter.get("/single-category/:slug", getSingleCategoryController )


export default categoryRouter