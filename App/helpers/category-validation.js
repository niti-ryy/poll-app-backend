const Category=require("../Models/Category")

const categoryValidationSchema={
    name:{
        notEmpty:{
            errorMessage:"category name is required"
        },
        custom:{                                             //value will be that of name and if you want to access any other properties in req then destrucutre req as second arguments
            options:async(value,{req})=>{
                const category=await Category.findOne({ name: { $regex: new RegExp(value, 'i') }})
                if(!category){
                    return true                             //this is like next() it goes to the next function just like req,res,next()
                }else{
                    throw new Error("category already present")  //this will add to errors obj of express validators               
                }
            }
        }
    }
}

module.exports=categoryValidationSchema