//const { response } = require('express')
const { request, response } = require('express')
const express=require('express')
const mongoose = require('mongoose')
const router=express.Router()
const requiredLogin1=require('../middleware/requiredLogin')
//const { route } = require('./auth')
const Post=mongoose.model('Post')

router.get('/allpost',(request,response)=>{
    Post.find().populate('postedBy',"_id name email").then(posts=>{
        response.json({successMessage:posts})
    }).catch(err=>{
        response.json({errorMessage:err})
    })

})

router.post('/createpost',requiredLogin1, (request,response)=>{
    const{title,body,photo}=request.body
    console.log(request.body);
    if(!title){
        return response.status(422).json({errorMessage:"please add title"})
    }
    if(!body){
        return response.status(422).json({errorMessage:"please add body"})

    }
    if(title && body){
        console.log(request.user)
       //response.send('post created')
       const post=new Post({
        title,
        body,
        photo,
        postedBy:request.user
       })
       post.save().then(result=>{
        response.json({successMessage:result})
       }).catch(err=>{
        response.json({errorMessage:result})

       })
    }
})
router.get('/mypost',requiredLogin1,(request,response)=>{
     //response.json(request.user)
     
    Post.find({postedBy:request.user._id}).populate('postedBy' , "_id name email" ).then(mypost=>{
        response.json(mypost)
        
       
    })
    })

module.exports=router