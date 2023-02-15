const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
    }
})


const mycolect = mongoose.model("mycolect", userSchema)

module.exports = mycolect

