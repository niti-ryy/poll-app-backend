const mongoose=require("mongoose")
const {Schema}=mongoose

const userSchema=new Schema({
       username:String,
       email:String,
       password:String,
       registrationDate:{
            type:Date,
            default:new Date()
       },
       pollsCreated:[Schema.Types.ObjectId]
},{timestamps:true})

const User=mongoose.model("User",registerSchema)

module.exports=User