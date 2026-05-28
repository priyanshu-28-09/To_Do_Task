const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/todo")

  .then(() => {
    console.log("MongoDB Connected");
  })

  .catch((err) => {
    console.log(err);
  });

/* GET ALL TASKS */

app.get("/get", async (req, res) => {

  try {

    const todos = await TodoModel.find();

    res.json(todos);

  } catch (err) {

    res.status(500).json(err);

  }
});

/* ADD TASK */

app.post("/add", async (req, res) => {

  try {

    const currentDate = new Date();

    const date =
      currentDate.toLocaleDateString();

    const time =
      currentDate.toLocaleTimeString();

    const newTask =
      await TodoModel.create({

        task: req.body.task,

        completed: false,

        date,

        time

      });

    res.json(newTask);

  } catch (err) {

    res.status(500).json(err);

  }
});

/* TOGGLE TASK */

app.put("/update/:id", async (req, res) => {

  try {

    const id = req.params.id;

    const task =
      await TodoModel.findById(id);

    if (!task) {

      return res
        .status(404)
        .json({
          message: "Task not found"
        });
    }

    task.completed =
      !task.completed;

    await task.save();

    res.json(task);

  } catch (err) {

    res.status(500).json(err);

  }
});

/* DELETE TASK */

app.delete("/delete/:id", async (req, res) => {

  try {

    const id = req.params.id;

    const deletedTask =
      await TodoModel.findByIdAndDelete(id);

    res.json(deletedTask);

  } catch (err) {

    res.status(500).json(err);

  }
});

app.listen(3001, () => {

  console.log(
    "Server is Running on port 3001"
  );

});