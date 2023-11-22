// const pollValidation={
//     question:{
//         notEmpty:{
//             errorMessage:"Question is required"
//         }
//     },
//     createdDate:{
//         isDate:{
//             errorMessage:"date should be valid",
//             format:"YYYY-MM-DD"
//         },
//         custom:{
//             options:(value)=>{
//                 const d=new Date()
//                 const year=d.getFullYear,month=d.getMonth()+1,day=d.getDay()
//                 if(new Date(value)<new Date(`${year}-${month}-${day}`)){                            //new Date(value) here string sent form frontend is being convertd to date object to compare in js date can be compared
//                     throw new Error("created data cannot be less than today")
//                 }else{
//                     return true
//                 }
//             }
//         }
//     },
//     endDate:{
//         isDate:{
//             errorMessage:"date should be valid",
//             format:"YYYY-MM-DD"
//         },
//         custom:{
//             options:(value,{req})=>{
//                 if(new Date(value)<new Date(req.body.createdDate))
//                 throw new Error("poll end date cannot be less than created date")
//             }
//         }
//     },
//     categoryId:{
//         isMongoId:{
//             errorMessage:"should be valid mongoDbId"
//         }
//     },
//     options:{
//         isArray:{
//             options:{min:2},
//             errorMessage:"there should be mininum 2 options"
//         },
//         custom:{
//             options:(value)=>{
//                 const result=value.every(ele=>{
//                     return ele.optionText.trim().length>0      //checking if the options fields are empty             
//                 })
//                 if(!result){
//                     throw new Error ("options must be present")
//                 }else{
//                     return true
//                 }
//             }
//         }
//     }
// }

// module.exports=pollValidation

const pollValidation = {
    question: {
        notEmpty: {
            errorMessage: 'question is required'
        }
    }, 
    // createdDate : {
    //     isDate : {
    //         errorMessage: 'date should be valid',
    //         format: 'YYYY-MM-DD'
    //     },
    //     custom: {
    //         options: (value) => {
    //             const today = new Date()
    //             const year = today.getFullYear(), month = today.getMonth() + 1, day = today.getDate()
    //             if(new Date(value) < new Date(`${year}-${month}-${day}`)){
    //                 throw new Error('created date cannot be less today')
    //             } else {
    //                 return true 
    //             } 
    //         }   
    //     }
    // },
    endDate: {
        isDate : {
            errorMessage: 'date should be valid', 
            format: 'YYYY-MM-DD'
        }, 
        custom : {
            options: (value, { req }) => {
                if(new Date(value) < new Date(req.body.createdDate)) {
                    throw new Error('poll end date cannot be less than the created date')
                } else {
                    return true 
                }
            }
        }
    },
    categoryId: {
        isMongoId : {
            errorMessage: 'should be a valid mongodb id'
        }
    },
    options: {
        isArray: {
            options: { min: 2},
            errorMessage: 'there should be minium 2 options'
        },
        custom: {
            options: (value) => {
                const result = value.every(ele => {
                    return ele.optionText.trim().length > 0 
                })
                if(!result) {
                    throw new Error('options cannot be empty')
                } else {
                    return true 
                }
            }
        }
    }
}

module.exports = pollValidation