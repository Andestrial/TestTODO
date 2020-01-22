const mongoose = require('mongoose');
const express = require("express")
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcryptjs')


const app = express();


mongoose.set('useFindAndModify', false);

router.get("/users", (req, res)=>{

    User.find({}, (err, users)=>{
      if(err) return console.log(err)
      res.send(users)
    })
  });

router.get('/users/:id', (req, res)=>{
    
    const id = req.params._id;
    User.findOne({id:id}, (err,user)=>{
      if(err) return console.log(err)
      res.send(user);
    })
  })
  
router.post('/users',  async (req, res)=>{
    
    if(!req.body) return res.sendStatus(400);
    
    const name = req.body.login;
    const newEmail = req.body.email;
    const newPass = req.body.password;

    const hashedPassword = await bcrypt.hash(newPass, 8);
    console.log(hashedPassword);
    const isMatch = await bcrypt.compare(newPass, hashedPassword)
    console.log(isMatch);
    
    const newUser = new User({
      name:name,
      email:newEmail,
      password: hashedPassword
    });
    
    newUser
    .save()
    .then(() => {
      res.status(201).send(newUser);
    })
    .catch((error) => {
      res.status(500).send(error);
      
    });
   });

router.delete('/users/:id', (req, res)=>{
    
    console.log("Я работаю блятб");
    const id = req.params.id;
    User.findByIdAndDelete(id , function(err, user){
                
        if(err) return console.log(err);
        res.json(user);
    });
});

router.put("/users",async (req, res)=>{

    if(!req.body) return res.sendStatus(400)
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 8)

    const newUser = { 
        name : name, 
        email: email,
        password : hashedPassword
    }
    User.findOneAndUpdate({_id : id}, newUser, {new: true}, (err, user)=>{
        if(err) return console.log(err);
        res.send(user);
    })
})

   module.exports = router;