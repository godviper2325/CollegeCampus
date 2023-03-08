const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema.Types
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    followers:[{
         type:ObjectId,
         ref:'User'
    }],
    following:[{
        type:ObjectId,
        ref:'User'

    }],
    image:{
        type:String,
        default:"https://res.cloudinary.com/deswhfdie/image/upload/v1678176551/download_ooynrd.png"
    }


})
const User=mongoose.model("User",userSchema)

module.exports=User