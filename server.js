//forgotpassword need to fix storage
// FRONTEND: http://localhost:5173/

import express from 'express'
import dotenv from 'dotenv'
import dbAtlas from './config/dbAtlas.js';
import morgan from 'morgan';
import authRouter from './routes/auth.route.js';
import categoryRouter from './routes/categoryRoutes.js';
import cors from 'cors'
import productRouter from './routes/productRoutes.js';
dotenv.config(); //this must be use before process.env.;----

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));  //he console log madhe kiti time vr localhost site browesr ver open zali te sangte
//middlewar

//routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/product', productRouter)
//routes

dbAtlas();

app.get("/", (req,res)=>{
    res.send('<h1>Welcome To Ecommerce Website</h1>')
});

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`)
});