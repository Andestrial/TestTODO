const mongoose = require('mongoose');
const express = require("express")
const router = express.Router();
const Task = require('../models/tasks');
const bcrypt = require('bcryptjs');

router.get('/tasks',async (req, res)=>{
    const task = await Task.find({}).sort({'priority': '1'});
    res.send(task);
})


router.get('/tasks/:id', (req, res)=>{

    const id = req.params._id

    Task.findOne({id:id}, (err, succ)=>{
        if(err) return console.log(err);
        res.send(succ);
    })
})

router.post('/tasks',  (req , res)=>{
  
    if(!req.body) return res.sendStatus(400);
    
    const description = req.body.description;
    const priority = req.body.priority;

    const newTask = new Task({
        description: description,
        completed : false,
        priority : priority
    });

    newTask
    .save()
    .then(()=>{
        res.status(201).send(newTask);
    }).catch((err)=>{
        res.status(400).send(err);
    })
});


router.delete("/tasks/:id", (req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const id = req.params.id;

    Task.findByIdAndDelete(id, (err, succ)=>{
        if(err) return console.log(err);
        res.status(201).send(succ);
    })

})

router.put("/tasks", (req, res)=>{
    if(!req.body) return res.sendStatus(400);

    const id = req.body._id;
    const name = req.body.name;

    const newTask = {
        description : name,
        completed : true
    }

    Task.findOneAndUpdate({id: id}, newTask , {new: true}, (err, succ)=>{
        if(err) return console.log(err);
        res.send(succ);
    })
})

module.exports = router;