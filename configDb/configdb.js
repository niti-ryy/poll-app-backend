const mongoose=require("mongoose")

const configdb=async()=>{
    try{
       const dbconnection=await mongoose.connect("mongodb://localhost:27017/poll-app")
       console.log("db connected succesfully")
    }catch(e){
        console.log(e)
    }
}

module.exports=configdb