const jwt=require("jsonwebtoken")
const _ = require('lodash')
const authenticateUser=(req,res,next)=>{
    let token=req.headers["authorization"]
    if(!token){
        return res.status(401).json({errors:"authentication failed"})
    }
    token=token.split(" ")[1]
    try{  
        const tokenData=jwt.verify(token,"secret")
        req.user=_.pick(tokenData,["id"])  //careful about using lodash its _.pick
        // req.user={id:tokenData.id}
        next()
    }catch(e){
        res.status(401).json({errors:"authentication failed"})
    }

}

module.exports={
    authenticateUser
}

