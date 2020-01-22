const mongoose = require('mongoose');
const express = require("express")
const router = express.Router();
const User = require('../models/users');
const bcrypt = require("bcryptjs")

mongoose.set('useFindAndModify', false);

router.post('/register', async (req, res)=>{
 
    const name = req.body.reg;
    const pass = req.body.pass;
   
User.findOne({name: name}, async (err, succ)=>{
        if(err) return console.log(err);
        const newPass = succ.password;
        const isMatch = await bcrypt.compare(pass, newPass)
        
        if(isMatch){
        res.status(201).sendFile(__dirname + "/register.html")}
        else{
            res.status(400).send("User not found")
        }
    }); 
})

module.exports = router;


