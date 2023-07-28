const express = require("express");

const router = express.router();

router.post("/register", (req,resp)=>{
    res.json({message: "Register the user"})  ;
})

router.post("/login", (req,res)=>{
    res.json({message: "User logged in"});
})