const User=require("../Models/Register")
const usersCltr={}


usersCltr.register=async(req,res)=>{
    const {body}=req
    try{
        const user=new User(body)
        await user.save()
        res.json({
            message:"user registered successfully"
        })
    }catch(e){

    }
}