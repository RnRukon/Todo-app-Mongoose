const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../Schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get("/", async (req, res) => {
  try {
    const doc = await Todo.find();
    res.status(200).json({
      result: doc,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});
// POST A TODO
router.post("/", async (req, res) => {
  try {
    await Todo.create(req.body);
    res.status(201).json({
      message: "Todo was inserted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// GET A TODO by ID
router.get("/:id", async (req, res) => {
  try {
    const doc = await Todo.find({ _id: req.params.id });
    res.status(200).json({ doc, message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Failed to find doc" });
  }
});
// Post of multiple todo
router.post("/multiple", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(201).json({ message: "Data inserted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to insert data" });
  }
});

// put of update todo
router.patch("/update/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      req.params.id,
      { status: "active" },

      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({ doc: result, message: "Data updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update data" });
  }
});

// delete todo
router.delete("/delete/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(202).json({ message: "Data deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete data" });
  }
});

module.exports = router;
