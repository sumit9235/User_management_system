const mongoose = require('mongoose')
const user_dataSchema=mongoose.Schema({
    user_id: String,
    user_name: String,
    user_email: String,
    user_password: String,
    user_image: String,
    total_orders:  {
        type: Number,
        default: 0 
    },
    created_at: {
        type:Date,
        default: Date.now
      }, 
    last_logged_in: {
        type:String,
        default:"not logged in yet"
    },
},{
    versionKey:false
})

const UserDataModel=mongoose.model("user_data",user_dataSchema)

module.exports={
    UserDataModel
}