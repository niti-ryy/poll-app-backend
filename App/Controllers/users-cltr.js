const User=require("../Models/Register")
const bcryptjs=require("bcryptjs")
const {validationResult}=require("express-validator")
const usersCltr={}


usersCltr.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {body}=req
    try{
        
        const user=new User(body)
        const salt=await bcryptjs.genSalt()
        const hashedPassword=await bcryptjs.hash(user.password,salt)
        user.password=hashedPassword
        const saveduser=await user.save()
        res.json({
            message:"user registered successfully",
            user:saveduser
        })
    }catch(e){

    }
}

module.exports=usersCltr