const User=require("../Models/Register")

const usernameSchema={
        notEmpty:{
            errorMessage:"username is required"
        }  
}
const passwordSchema={
        notEmpty:{
            errorMessage:"password is required"
        },
        isLength:{
            options:{min:8,max:128},
            errorMessage:"passwod should be between 8-128 characters"
        }
    
}
const emailRegisterSchema={
        notEmpty:{
            errorMessage:"email is required"
        },
        isEmail:{
            errorMessage:"invalid email format"
        },
        custom:{
            options:async(value)=>{
                const user=await User.findOne({email:value})
                if(user){
                    throw new Error ("email already registered")
                }else{
                    return true
                }
            }
        }
    
}
const emailLoginSchema={
    notEmpty:{
        errorMessage:"email is required"
    },
    isEmail:{
        errorMessage:"invalid email format"
    },
}

const userRegisterValidationSchema={
  username:usernameSchema,
  password:passwordSchema,
  email:emailRegisterSchema
}

const userLoginValidationSchema={
    email:emailLoginSchema,
    password:passwordSchema
}



module.exports={userRegisterValidationSchema,userLoginValidationSchema}