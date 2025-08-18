const errorMiddleware = (err,req,res,next)=>{
    try {
        let error = { ...err }  // (...) shallow copy of the original err object.
        error.message =err.message;

        console.error(err);

        //Mongoose  bad objecId , CastError happens when you try to use an invalid value for a specific type, especially an invalid ID.
        if(err.name === 'CastError'){
            const message ='Resource not found';
            error = new Error(message);
            error.statusCode =404;
        }

        // Mongoose duplicte key
        if(err.code === 11000) {
            const message = "Duplicate feild value entred";
            error =new Error(message);
            error.statusCode =400;
        }

        // Mongoose validate error  when the user sends wrong or incomplete data 
        if(err.name ==='ValidationError'){
            const message = Object.values(err.errors).map(val =>val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode ||500).json({
            succes:false,
            error:error.message || "server Error"})

        
    } catch (internalError) {
        // If something fails inside this middleware
        console.error("⚠️ Error inside errorMiddleware itself:", internalError);
        res.status(500).json({
            success: false,
            error: "Something went wrong in error handling.",
        });
    }
}

export default errorMiddleware;