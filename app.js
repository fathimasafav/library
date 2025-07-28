import cookieParser from 'cookie-parser';
import express from 'express';
import {PORT} from './config/env.js'



import authRouter from './routes/auth.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import userRouter from './routes/user.routes.js';
import bookRouter from './routes/book.routes.js';
import arcjetMiddleware from './middlewares/arject.middleware.js';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/book',bookRouter);

app.use(errorMiddleware)


app.get('/',(req,res)=>{
    res.send('welcome to the Library API')
})


app.listen(PORT,async()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
    await connectToDatabase();
})

export default app;