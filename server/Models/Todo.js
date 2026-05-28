const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({

  task: {
    type: String,
    required: true
  },

  completed: {
    type: Boolean,
    default: false
  },

  date: {
    type: String
  },

  time: {
    type: String
  }

})

const TodoModel = mongoose.model("todos", TodoSchema)

module.exports = TodoModel