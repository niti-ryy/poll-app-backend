const { validationResult } = require("express-validator")
const Category=require("../Models/Category")

const categoryCltr={}

categoryCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {body}=req
    //ensure uniquness of categories
    const categoryObj = await Category.findOne({ name: { $regex: new RegExp(body.name, 'i') } });  //refer this once to dct git 
    if(!categoryObj){
        const category=new Category(body)
        try{
            await category.save()
            res.json(category)
        }catch(e){
            res.status(500).json(e)
        }
    }else{
        res.status(401).json({
            message:"this category is already present "
        })
    }  
}

categoryCltr.list=async(req,res)=>{
    try{
        const allCategories=await Category.find()
        res.json(allCategories)
    }catch(e){
        res.status(500).json(e)
    }
}

module.exports=categoryCltr


//find one returns an obj and find returns an [] so !null is false ref line 12,13 used regex to find
