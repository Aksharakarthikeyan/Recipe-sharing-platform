const express=require('express')
const app=express()
const mongoose=require('mongoose')
const port=3000


const mongouri='mongodb://localhost:27017/demo';

mongoose.connect(mongouri,{useNewUrlParser:true,useUnifiedTopology:true})

.then(()=>{
    console.log('MongoDB connected successfully')
})
.catch((err)=>
{
    console.error("not connected",err)
})