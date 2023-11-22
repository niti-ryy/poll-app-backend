const mongoose=require("mongoose")
const {Schema,model}=mongoose

const Poll=new Schema({
    question:String,
    creator:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    Options:[
        {
           pptionText:String 
        }
    ]
})