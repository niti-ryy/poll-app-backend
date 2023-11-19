const mongoose=require("mongoose")
const {Schema}=mongoose

const registerSchema=new Schema({

})

const Register=mongoose.model("Register",registerSchema)

module.exports=Register