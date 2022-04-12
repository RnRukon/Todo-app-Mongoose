const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../Schemas/todoSchema');
const Todo = new mongoose.model("Todo", todoSchema)


// POST A TODO
router.post("/", async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save((err) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          message: "Todo was inserted successfully!",
        });
      }
    });
  });