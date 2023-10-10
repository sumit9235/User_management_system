const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    user_name: String,
    user_email: String,
    user_password: String,
},{
    versionKey:false
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}