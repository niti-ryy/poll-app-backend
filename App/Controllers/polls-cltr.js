const { validationResult } = require("express-validator")
const User=require("../Models/Register")
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
        await User.findOneAndUpdate({_id:poll.creator},{$push:{pollsCreated:poll._id}})
        res.json(poll)
    }catch(e){
        res.status(500).json(e)
    }
}

pollsCltr.myPolls=async(req,res)=>{
    try{
        const myPolls=await Poll.find({creator:req.user.id})
        res.json(myPolls)
    }catch(e){
        res.status(500).json(e)
    }
}

// const currentDate = new Date();
// const endOfDay = new Date(currentDate);
// endOfDay.setHours(23, 59, 59, 999); // Set to the end of the current day



pollsCltr.active=async(req,res)=>{
    try {
        const polls = await Poll.find({ endDate: { $gte: new Date() } }).populate("categoryId").populate("creator",["username","_id"]);
        res.json(polls);
    }catch (e) {
        res.status(500).json(e);
    }
}

module.exports=pollsCltr