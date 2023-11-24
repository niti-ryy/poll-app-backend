const mongoose=require("mongoose")
const {Schema}=mongoose

const userSchema=new Schema({
       username:String,
       email:String,
       password:String,
       pollsCreated:[Schema.Types.ObjectId]
},{timestamps:true})

const User=mongoose.model("User",userSchema)

module.exports=User