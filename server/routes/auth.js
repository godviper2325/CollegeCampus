const express=require('express')

const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model('User')
const bycrpt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const{JWT_SECRET}=require('../env')
const { request, response } = require('express')


const requiredLogin=require('../middleware/requiredLogin')


router.get('/safe',requiredLogin, (request,response)=>{
    console.log("safe login");
})

router.get('/', (request,response)=>{
    response.send('vcentry home page')
})

router.get('/about', (request,response)=>{
    response.send('vcentry about page')
})

router.post('/signup', (request,response)=>{
    const {name,email,password,image}=request.body
    
     if(!name|| !email|| !password){
        response.status(422).json({errorMessage: "Please Enter All fields"})
     }else{
        // response.json({successMessage:"signedup successfully"})
        User.findOne({email:email}).then((existsUser)=>{
            if(existsUser){
                return response.status(422).json({errorMessage:"same user already exists"})
            }else{

                bycrpt.hash(password,12).then((hashedPassword)=>{
                    const user=new User({
                        
                            email,
                            name,
                            password:hashedPassword,
                            image
                        })
                        user.save().then(user=>{
                            response.status(200).json({successMessage:"user  created successfully"})
                        }).catch(err=>{
                            response.status(200).json({err})
                        })

                })
                

                
            }
        })
    }
       
})
router.post('/signin',(request,response)=>{
   // console.log(request.body);
    //response.send(request.body)
    const{email, password}=request.body

    if(!email || !password){
        response.status(422).json({errorMessage:"Please enter email and password"})
    }else{
        User.findOne({email:email}).then((existsUser)=>{
            if(!existsUser){
                return response.status(422).json({errorMessage:"Invalid email"})
            }
            else{
                bycrpt.compare(password,existsUser.password).then(validUser=>{
                    if(validUser){
                    //response.status(200).json({successMessage:"Signed in successfully"})
                    //existsUser._id
                    const token=jwt.sign({_id:existsUser._id},JWT_SECRET)
                    const {_id,email,name,following,followers,image}=existsUser
                    response.json({successMessage:"Login success",   token:token, user:{_id:_id,email:email,name:name,following:following,followers:followers,image:image}})
                    }
                    else{
                        return response.status(422).json({errorMessage:"Invalid password"})
                    }

                })
            }
        }).catch(error=>{
            response.json({errorMessage:error})
        })
    }
    
})
module.exports=router