const express = require("express")
const mongoose = require("mongoose")
const studentModel = require("./model/studentModel")
const cors = require("cors")

const app = express()

app.use(express.json())

app.use(cors())

mongoose.connect("mongodb+srv://jacfarmahamed77:h7m2VuT7HuFONc1t@cluster0.g8dxp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected Database")
}).catch((error) => console.log(error))

// create data
app.post("/create/student", async (req, res) => {
    const newData = studentModel(req.body)
    const saveData = await newData.save()
    if(saveData){
        res.send(saveData)
    }
})

// read data
app.get("/read/student", async (req, res) => {
    const readData = await studentModel.find()
    if(readData){
        res.send(readData)
    }
})


// update
app.put("/update/student/:id", async (req, res) => {
    const putData = await studentModel.updateOne({_id: req.params.id}, {$set: req.body})
    if(putData){
        res.send("Success")
    }
})


// delete
app.delete("/delete/student/:id", async (req, res) => {
    const removeData = await studentModel.deleteOne({_id: req.params.id})
    if(removeData){
        res.send(removeData)
    }
})



app.listen(1000, () => console.log("Server is running"))