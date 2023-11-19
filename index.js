require("dotenv").config()
const express=require("express")
const configdb=require("./configDb/configdb")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
const port=4096

configdb()
app.listen(port,()=>{
    console.log("backend connected successfully on port ",port)
})