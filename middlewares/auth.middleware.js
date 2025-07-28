import User from '../models/user.model.js'
import Jwt  from 'jsonwebtoken';
import {JWT_SECRET} from '../config/env.js'



const authorize = async(req,res,next)=>{
    try{

        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split('')[1];

        }

        if(!token)return res.status(401).json({message:"Unauthorized"});

        const decoded = Jwt.verify(token,JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user)return res.status(401).json({message:"Unauthorized"})

        req.user=user;

        next();


        // Attach user to request

    }catch(error){
        res.status(401).json({message:'unauthorized',error:error.message})
    }

}

export default authorize    ;
