//const { response } = require('express')
const { request, response } = require('express')
const express=require('express')
const mongoose = require('mongoose')
const router=express.Router()
const requiredLogin1=require('../middleware/requiredLogin')
//const { route } = require('./auth')
const Post=mongoose.model('Post')

router.get('/allpost',requiredLogin1,(request,response)=>{
    Post.find().populate('postedBy',"_id name email")
    .populate('comments.postedBy',"_id name").then(posts=>{
        response.json({successMessage:posts, posts:posts})
    }) .catch(err=>{
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
    router.put('/like',requiredLogin1,(request,response)=>{
        console.log(request.body.postId);
        Post.findByIdAndUpdate(request.body.postId,
            {
                $push:{likes:request.user._id}
            },
            {
                new:true
            }).exec((err,result)=>{
                if(err){
                    return response.status(422).json({errorMessage:err})
                }else{
                    response.json({successMessage:result})
                }
            })
            
    })
    router.put('/unlike',requiredLogin1,(request,response)=>{
        console.log(request.body.postId);
        Post.findByIdAndUpdate(request.body.postId,
            {
                $pull:{likes:request.user._id}
            },
            {
                new:true
            }).exec((err,result)=>{
                if(err){
                    return response.status(422).json({errorMessage:err})
                }else{
                    response.json({successMessage:result})
                }
            })
            
    })
    router.put('/comment',requiredLogin1,(request,response)=>{
        console.log(request.body.text);
        console.log(request.user._id);
        console.log(request.body.postId);

        const comment={
            text:request.body.text,
            postedBy:request.user._id
        }

        Post.findByIdAndUpdate(request.body.postId,
            {
                $push:{comments:comment}
            },
            {
                new:true
            }).populate("comments.postedBy","_id name")
            
            .exec((err,result)=>{
                if(err){
                    return response.status(422).json({errorMessage:err})
                }else{
                    response.json({successMessage:result})
                }
            })
            
    })

    router.delete('/deletepost/:postId',requiredLogin1,(request,response)=>{

        console.log(request.params.postId);
        Post.findOne({_id:request.params.postId})
        .populate("postedBy","_id")
        .exec((err,post)=>{
            if(err || !post){
                return response.status(422).json({errorMessage:err})
            }
            else{
                if(post.postedBy._id.toString()===request.user._id.toString()){
                    post.remove().then(result=>{
                        response.json(result)
                    }).catch(err=>{ 
                        console.log(err);
                    })
                }

            }

        })
    })


module.exports=router