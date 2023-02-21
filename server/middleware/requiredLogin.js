const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../env')
const mongoose=require('mongoose')
const User=mongoose.model('User')
const requiredLogin=(request,response,next)=>{


    const{authorization} = request.headers

    if(!authorization){
        return response.status(401).json({errorMessage:"You should login first"})
    } else{

     const token=authorization.replace("Bearer ","")
     jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return response.status(401).json({errorMessage:"you should login first"})
        }else{
            const{_id}=payload
            User.findById(_id).then(userdata=>{
                request.user=userdata
                next()
            })
        }
     })

    }
}
module.exports=requiredLogin
