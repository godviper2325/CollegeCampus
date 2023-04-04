import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'

export default function Profile() {

    const [image, setImage] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [url, setUrl]=useState([])

    useEffect(() => {
        axios.get('http://localhost:7000/mypost', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('jwt')}`
            }
        }).then(result => {
            console.log(result);
            setImage(result.data)

        })
    }, [])

    const updatePhoto=async(e)=>{
        const data = new FormData()
        data.append('file',e.target.files[0])
        data.append('upload_preset', 'socialmedia')
        data.append('cloud_name', 'deswhfdie')
        let resultdata = await axios.post('https://api.cloudinary.com/v1_1/deswhfdie/image/upload', data)
        .then(result=>{
            setUrl(url.push(result.data.url))
            axios.put('http://localhost:7000/updatepic', { image:url[0]},

            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`

                }
            })
        }).then(result=>{
            console.log(result);
        }).catch(err=>{
            console.log(err);
        })
    }
    return (

        <div style={{ maxWidth: "500px", margin: "0px auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0px", borderBottom: "1px solid gray" }}>
                <div>

                    <br></br>

                    <br></br>

                    <img style={{ width: "180px", height: "180px", borderRadius: "100px" }} src={state ? state.image : "loading..."}></img>

                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Update Profile Picture</span>
                            <input name="image" type="file"  onChange={updatePhoto}/>
                        </div>
                        <br>
                        </br>
                    </div>




                </div>
                <div>
                    <h4>{state.name}</h4>
                    <span>{state.email}</span>

                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <h6>{image.length} posts</h6>
                        <br></br>
                        <h6> {state?.followers?.length} followers</h6>
                        <h6> {state?.following?.length} following</h6>
                    </div>

                </div>


            </div>

            <div className="gallery">
                {
                    image.map(item => {
                        return <img className="photos" src={item.photo} alt={item.title}></img>
                    })
                }

            </div>


        </div>


    )
}