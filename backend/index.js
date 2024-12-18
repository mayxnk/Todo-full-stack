//boilerplate code for express
const express = require('express')
const { createTodo, updateTodo } = require('./types')
const { Todo } = require('./db')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors({}))

app.post('/todo',async (req, res) => {
    const createPayload = req.body
    const parsedPayload = createTodo.safeParse(createPayload)
    if(!parsedPayload.success){
        res.status(411).json({
            message: "You have entered wrong input"
        })
        return;
    }
    //put it in mongodb
    try {
        await Todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        })
        res.json({
            message: "Todo created"
        })
    } catch (error) {
        res.status(403).json({
            message: "Database connection problem"
        })
    }
})



app.get('/todos',async (req,res) => {
    const todos = await Todo.find({})
    res.json({
        todos:todos 
    })
})



app.put('/completed',async (req,res) => {
    const id = req.body
    const parsedId = updateTodo.safeParse(id)
    if(!parsedId.success){
        res.json({
            message : "You have sent wrong ID"
        })
        return;
    }
    //update the todo
    try {
        await Todo.updateOne({
            _id:req.body.id
        },{
            completed: true
        })
        res.json({
            message: "Todo marked as completed"
        })
    } catch (error) {
        res.status(403).json({
            message:`Some Error: ${error}`
        })
    }
})

app.listen(PORT,() => {
    console.log(`Server listening on PORT ${PORT}`);
})