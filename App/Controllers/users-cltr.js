const User=require("../Models/Register")
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")
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
        res.status(500).json(e)
    }
}

usersCltr.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {body}=req
    try{
        const user=await User.findOne({email:body.email})
        if(!user){
            return res.status(404).json({errors:[{msg:"invalid email or password"}]}) //the reason it is sent as array is to accodmate in the front end due to erros being array in res obj due to validator package    
        }
        const result=await bcryptjs.compare(body.password,user.password)
        if(!result){
            return res.status(404).json({errors:[{msg:"invalid email or password"}]})
        }
        const tokenData={id:user._id}
        const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:"1d"})
        res.json({token:`Bearer ${token}`})
    }catch(e){
        res.status(500).json(e)
        console.log(e)
    }
}

usersCltr.account=async(req,res)=>{
    console.log(req)
    try{
        const user=await User.findById(req.user.id)
        res.json(user)
    }catch(e){
        res.status(500).json({errors:"something went wrong"})
    }
}


module.exports=usersCltr