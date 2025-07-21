import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
await connectDB();



//Middlewares
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5173',
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())

//Routes
app.get("/",(req,res)=>res.send("API is Working"))
app.use("/api/admin/",adminRouter)
app.use("/api/blog/",blogRouter)
app.use("/api/user/",userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log('Server is running on port ' + PORT)    
})

export default app;