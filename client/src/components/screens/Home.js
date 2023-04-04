import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../App'

import { Link } from 'react-router-dom'
export default function Home() {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        axios.get("http://localhost:7000/allpost", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`

            }
        }).then(result => {
            console.log(result.data.posts);
            setData(result.data.posts)
        })
    }, [])
    const likePost = (id) => {
        axios.put('http://localhost:7000/like', { postId: id }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }

        }).then(result => {
            console.log(result.data.successMessage);
            const newData = data.map(item => {
                // console.log(item._id,'---',result.data.successMessage._id);
                if (item._id == result.data.successMessage._id) {
                    return result.data.successMessage
                } else {
                    return item
                }
            })
            setData(newData)
            console.log(data)
           
            
        }).catch(err => {
            console.log(err);
        })
    }
    const unlikePost = (id) => {
        axios.put('http://localhost:7000/unlike', { postId: id }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }

        }).then(result => {
            console.log(result);

            const newData = data.map(item => {
                console.log(item._id,'---',result.data.successMessage._id);
                if (item._id == result.data.successMessage._id) {
                    return result.data.successMessage
                } else {
                    return item
                }
            })
            setData(newData)
            console.log(data)
        }).catch(err => {
            console.log(err);
        })
    }
    const addComment=(e,id)=>{
        e.preventDefault()
        console.log(e.target[0].value);
        console.log(id)
        axios.put('http://localhost:7000/comment', { postId: id, text:e.target[0].value }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }

        }).then(result => {
            console.log(result.data.successMessage);
            const newData = data.map(item => {
            console.log(item._id,'---',result.data.successMessage._id);
                if (item._id == result.data.successMessage._id) {
                    return result.data.successMessage
                } else {
                    return item
                }
            })
            setData(newData)
            console.log(data)
            e.target[0].value=""
           
            
        }).catch(err => {
            console.log(err);
        })
    }
    
    const deletePost=(postid)=>{

        axios.delete("http://localhost:7000/deletepost/" + postid,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }

        }).then(result=>{
            console.log(result);
        const newData=data.filter(item=>{
             return   item._id!==result.data._id
            })
           setData(newData)
        })

    }
    return (
        <div>

            {
                data.map(item => {
                    return (
                        <div key={item._id} className="card home-card">
                            <span><b><Link to={item.postedBy._id!==state._id ? '/profile/'+item.postedBy._id:'/profile'}>{item.postedBy.name}</Link></b> </span>
                            {
                                 item.postedBy._id == state._id && 
                                 <i onClick={()=>deletePost(item._id)}   className="material-icons" style={{ color: 
                                    'red', float:'right'}}>delete</i> 
                            }

                            
                            
                            <br></br> <br></br>
                           
                            <div className="card-image">
                                <img src={item.photo}></img>

                            </div>
                            <div>
                                <br></br>
                                <i className="material-icons" style={{ color: 'red' }}>favorite</i>
                                <br></br>

                                {
                                    item.likes.includes(state._id)
                                    ?
                                    <i className="material-icons" style={{ color: 'black' }} onClick={() => unlikePost(item._id)}>thumb_down</i>
                                    :
                                    <i className="material-icons" style={{ color: 'green' }} onClick={() => likePost(item._id)}>thumb_up</i>

                                }
                                
                                 
                                <br></br>
                                <i>likes : <b>{item.likes.length}</b></i>
                                <h6>Title:{item.title}</h6>
                                <p>Body:{item.body}</p>
                                <hr></hr>
                                 <b>Comments :</b>
                                {
                                    item.comments.map(c=>{
                                        return(
                                            <p><a href="#"><b>{c.postedBy.name}</b></a> - {c.text}</p>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>addComment(e,item._id)}>
                                <input type="text" placeholder="Enter your comments"></input>
                                </form>
                            </div>
                        </div>
                    )

                })
            }

        </div>


    )
}