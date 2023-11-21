const Category=require("../Models/Category")

const categoryValidationSchema={
    name:{
        notEmpty:{
            errorMessage:"category name is required"
        }
    }
}

module.exports=categoryValidationSchema