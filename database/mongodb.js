import  mongoose from "mongoose";
import { DB_URI ,NODE_ENV} from "../config/env.js";


if(!DB_URI){
    throw new Error("please define the MONGODB_URI variable inside .env.<development/production>.local")   
}

// connect to mongodb
const connectToDatabase = async () => {
    
    try {
        await mongoose.connect(DB_URI)
        console.log(`connected to database ${NODE_ENV}`)
    } catch (error) {
        console.error('Erroe connecting to database',error)
        process.exit(1)
    }
}

export default connectToDatabase;