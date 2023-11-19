const userValidation={
    username:{
        notEmpty:{
            errorMessage:"username is required"
        }
    },
    email:{
        notEmpty:{
            errorMessage:"email is required"
        }
    },
    password:{
        notEmpty:{
            errorMessage:"password is required"
        },
        isLength:{
            options:{min:8,max:128},
            errorMessage:"passwod should be between 8-128 characters"
        }
    }
}

module.exports=userValidation