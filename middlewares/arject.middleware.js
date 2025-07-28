import aj from '../config/arject.js'

const arcjetMiddleware = async(req,res,next)=>{
    const decision = await aj.protect(req,{requested: 1})
    try{
    if (decision.isDenied()){
        if(decision.reason.isRateLimit()) return res.status(429).json ({ error : 'Rare limit exceeded'});
        if(decision.reason.isBot()) return res.status(403).json({error: 'Bot detected'});

      
        return res.status(403).json({error: 'Acess denided'})  
    } 
    }catch(error){
        console.log(`Arject middleware Error ${error}`);
        next(error);
    }
}
export default arcjetMiddleware