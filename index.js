require("dotenv").config()
const express=require("express")
const configdb=require("./configDb/configdb")
const {checkSchema}=require("express-validator")
const cors=require("cors")
const userValidationSchema = require("./App/helpers/user-validation")
const usersCltr = require("./App/Controllers/users-cltr")
const app=express()
app.use(express.json())
app.use(cors())
const port=4096

configdb()

app.post("/auth/register",checkSchema(userValidationSchema),usersCltr.register)
app.listen(port,()=>{
    console.log("backend connected successfully on port ",port)
})