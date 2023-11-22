require("dotenv").config()
const express=require("express")
const configdb=require("./configDb/configdb")
const {checkSchema}=require("express-validator")
const cors=require("cors")
const {userRegisterValidationSchema, userLoginValidationSchema} = require("./App/helpers/user-validation")
const usersCltr = require("./App/Controllers/users-cltr")
const { authenticateUser } = require("./App/middlewears/authenticateUSer")
const categorynameSchema = require("./App/helpers/category-validation")
const categoryCltr = require("./App/Controllers/category-cltr")
const categoryValidationSchema = require("./App/helpers/category-validation")
const pollValidationSchema = require("./App/helpers/polls-validation")
const pollsCltr = require("./App/Controllers/polls-cltr")
const app=express()
app.use(express.json())
app.use(cors())
const port=4096

configdb()

app.post("/auth/register",checkSchema(userRegisterValidationSchema),usersCltr.register)
app.post("/auth/login",checkSchema(userLoginValidationSchema),usersCltr.login)
app.get("/api/users/account",authenticateUser,usersCltr.account)

//CATEGORY CLTR
app.post("/api/categories",checkSchema(categoryValidationSchema),categoryCltr.create)
app.get("/api/categories",categoryCltr.list)

//POLLS CLTR
app.post("/api/polls",authenticateUser,checkSchema(pollValidationSchema),pollsCltr.create)

app.listen(port,()=>{
    console.log("backend connected successfully on port ",port)
})