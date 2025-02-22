const Todo = require('../models/todo');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//const Todo = require('./models/todo');

// Create a new todo
router.post('/', async (req, res) => {
    const { title,description,priority,date } = req.body;
    try {
        const todoData = await Todo.create({
            title: title,
            
            priority:priority,
            date: date
        });

        res.status(201).json(todoData); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }   
    
})

// Get all todos
router.get('/', async(req,res)=>{
    const showTodo = await Todo.find();
    try{
        res.status(200).json(showTodo);

    } catch(err){
        res.status(500).json({message:err.message});
    }
})

// Get a todo by id
router.get('/:id', async(req,res)=>{
    const {id} = req.params;
    try{
        const todo = await Todo.findById(id);
        res.status(200).json(todo);
    } catch(err){
        res.status(500).json({message:err.message});
    }
})  

//delete a todo by id

router.delete('/:id', async(req,res)=>{
    const {id} = req.params;
    try{
        const deleteTodo = await Todo.findByIdAndDelete(id);
        res.status(200).json(deleteTodo);
    } catch(err){
        res.status(500).json({message:err.message});
    }
})

//update a todo by id

router.put('/:id', async(req,res)=>{
    const {id} = req.params;
    const {task, status, date} = req.body;
    try{
        const updateTodo = await Todo.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updateTodo);
    } catch(err){
        res.status(500).json({message:err.message});
    }
})

module.exports = router;