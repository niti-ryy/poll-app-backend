const { validationResult } = require("express-validator")
const Poll=require("../Models/Poll")

const pollsCltr={}

pollsCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {body}=req
    const poll=new Poll(body)
    poll.creator=req.user.id
    try{
        await poll.save()
        res.json(poll)
    }catch(e){
        res.status(500).json(e)
    }
}

pollsCltr.getPolls=async(req,res)=>{

}

module.exports=pollsCltr