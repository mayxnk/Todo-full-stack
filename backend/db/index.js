const mongoose = require('mongoose')
const mongodb_url = require('../.env')
mongoose.connect()

const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    completed : {
        type: Boolean,
        default: false
    }
})
const Todo = mongoose.model("Todo",todoSchema)

module.exports = {
    Todo
}