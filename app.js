import cookieParser from 'cookie-parser';
import express from 'express';
import {PORT} from './config/env.js'
import path from "path";
import cors from "cors"





import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import userRouter from './routes/user.routes.js';
import bookRouter from './routes/book.routes.js';
import CartRouter from './routes/Cart.routes.js';
// import arcjetMiddleware from './middlewares/arject.middleware.js';




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

// app.use(arcjetMiddleware);
// app.use("/uploads", express.static("uploads"))
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/book',bookRouter);
app.use('/api/v1/cart',CartRouter)

app.use(errorMiddleware)


app.get('/',(req,res)=>{
    res.send('welcome to the Library API')
})


app.listen(PORT,async()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
    await connectToDatabase();
})

export default app;